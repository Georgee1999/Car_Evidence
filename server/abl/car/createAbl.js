const Ajv = require("ajv");
const addFormats = require("ajv-formats").default; 
const ajv = new Ajv(); 
addFormats(ajv);

const carDao = require("../../dao/car-dao.js"); 

const schema = {
    type: "object",
    properties: {
      SPZ: { type: "string", minLength: 6},
      model: { type: "string", minLength: 3 },
      yearOfMade: {type: "string", minLength: 4},
      color: {type: "string"},
      email: {type: "string", minLength: 5}
    },
    required: ["SPZ", "model", "yearOfMade","email"],
    additionalProperties: false, //žádné další vlastnosti nejsou povoleny 
  };

  async function CreateAbl(req, res) {
    try {
      let car = req.body; //Získáváte tělo požadavku (tj. data odeslaná klientem) a ukládáte je do proměnné car
  
      // validate input
      const valid = ajv.validate(schema, car);////Voláte metodu validate na instanci AJV, kterou jste dříve nakonfigurovali s pomocí schema a objektu user. Tato metoda zkontroluje, zda data uživatele odpovídají schématu.
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "Nesprávně vyplněnné údaje",
          validationError: ajv.errors,
        });
        return;
      }
  
      const carList = carDao.list();
      const carExists = carList.some((c) => c.SPZ === car.SPZ); 
      if (carExists) {
        res.status(400).json({
          code: "carAlreadyExists",
          message: `Car with SPZ ${car.SPZ} already exists`,
        });
        return;
      }
  
      car = carDao.create(car);
      res.json(car);
    } catch (e) {
      res.status(500).json({ message: e.message });
      console.log(e);
    }
  }
  module.exports = CreateAbl;
