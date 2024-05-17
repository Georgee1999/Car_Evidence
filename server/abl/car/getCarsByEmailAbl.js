const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const carDao = require("../../dao/car-dao.js");

const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" }
  },
  required: ["email"],
  additionalProperties: false
};

async function GetCarsByEmailAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      return res.status(400).json({
        code: "validationError",
        message: ajv.errors
      });
    }

    const { email } = req.body;
    const cars = carDao.getCarsByEmail(email);

    if (cars.length === 0) {
      return res.status(404).json({
        code: "carsNotFound",
        message: `Žádná auta pro e-mail: ${email} nebyla nalezena.`
      });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetCarsByEmailAbl;
