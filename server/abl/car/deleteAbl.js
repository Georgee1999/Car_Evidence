const Ajv = require("ajv");
const ajv = new Ajv();

const carDao = require("../../dao/car-dao.js");
//const attendanceDao = require("../../dao/attendance-dao.js");

const schema = {
  type: "object",
  properties: {
    SPZ: { type: "string", minLength: 6, maxLength: 8 },
  },
  required: ["SPZ"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
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

    const carList = carDao.list();
    const carExists = carList.some((c) => c.SPZ === reqParams.SPZ);
 
    if(carExists){
        carDao.remove(reqParams.SPZ);
        res.status(200).json({
            message:`Car with SPZ: ${reqParams.SPZ} was deleted`
        });
    }else{
        res.json({
            message: `Car with SPZ: ${reqParams.SPZ} does not exist.`
        })
    }

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
