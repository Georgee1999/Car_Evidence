const Ajv = require("ajv");
const ajv = new Ajv();

const carDao = require("../../dao/car-dao.js");

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
    const reqParams = req.body;

    const valid = ajv.validate(schema, reqParams);

    const carList = carDao.list();
    const carExists = carList.some((c) => c.SPZ === reqParams.SPZ);

    if (carExists) {
      carDao.remove(reqParams.SPZ);
      res.status(200).json({
        message: `Vozidlo s SPZ: ${reqParams.SPZ} bylo odstraněno.`,
      });
    } else if (!carExists) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: `Vozidlo s SPZ: ${reqParams.SPZ} neexistuje!`,
        validationError: ajv.errors,
      });
      return;
    } else if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Nesprávně vyplněné údaje",
        validationError: ajv.errors,
      });
      return;
    } else {
      res.status(400).json({
        code: "carDoesNotExist",
        message: `Vozidlo s SPZ: ${reqParams.SPZ} neexistuje.`,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
