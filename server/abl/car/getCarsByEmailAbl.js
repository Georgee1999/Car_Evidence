const carDao = require("../../dao/car-dao");
const userDao = require("../../dao/user-dao");

async function GetCarsByEmailAbl(req, res) {
  try {
    const { email } = req.body;
    const user = await userDao.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        code: "userNotFound",
        message: "Uživatel s tímto e-mailem neexistuje.",
      });
    }

    const cars = await carDao.getCarsByEmail(email);
    if (!Array.isArray(cars)) {
      console.error("Cars from DAO is not an array:", cars);
      return res.status(500).json({
        code: "internalError",
        message: "Expected an array of cars from DAO",
      });
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetCarsByEmailAbl;
