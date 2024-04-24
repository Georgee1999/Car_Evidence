const Ajv = require("ajv");
const ajv = new Ajv();

const userDao = require("../../dao/user-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 8, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const carDao = require("../../dao/car-dao.js");

    // get request query or body
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    
    // read user by given id
    const user = userDao.getUserCars(reqParams.id);
 
    
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${reqParams.id} not found`,
      });
      return;
    }

    const cars =  carDao.list(); 
    const userCars = cars.filter(car => car.email === user.email);
    

    res.json(userCars);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
