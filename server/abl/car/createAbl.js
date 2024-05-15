const Ajv = require("ajv");
const addFormats = require("ajv-formats").default; 
const ajv = new Ajv(); 
addFormats(ajv);

const carDao = require("../../dao/car-dao.js"); 
const userDao = require("../../dao/user-dao.js"); 

const schema = {
    type: "object",
    properties: {
      SPZ: { type: "string", minLength: 6, maxLength: 8},
      model: { type: "string", minLength: 3 },
      yearOfMade: {type: "string", minLength: 4},
      color: {type: "string"},
      email: {type: "string", minLength: 5, format: "email"}
    },
    required: ["SPZ", "model", "yearOfMade","email"],
    additionalProperties: false, //žádné další vlastnosti nejsou povoleny 
  };

  async function CreateAbl(req, res) {
    try {
      let car = req.body; 
  
      // validate input
      const valid = ajv.validate(schema, car); 
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "Nesprávně vyplněné údaje",
          validationError: ajv.errors,
        });
        
        return;
      }
  
      const carList = carDao.list();
      const carExists = carList.some((c) => c.SPZ === car.SPZ); 
      const userList = userDao.list();
      const emailExist = userList.some((u) => u.email === car.email);

    

      if(!emailExist){
        res.status(400).json({
          code: "userEmailNotExist",
          message: `Uživatel s tímto e-mailem ${car.email} neexistuje.`,
        });
        return;
      }
      if (carExists) {
        res.status(400).json({
          code: "carAlreadyExists",
          message: `Vozidlo s SPZ ${car.SPZ} již existuje.`,
        });
        return;
      }
  
      car = carDao.create(car);
      res.status(201).json(car);
    } catch (e) {
      res.status(500).json({ message: e.message });
      console.log(e);
    }
  }
  module.exports = CreateAbl;

  