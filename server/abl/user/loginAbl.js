const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const userDao = require("../../dao/user-dao");

async function LoginAbl(req, res) {
  try {
    const { email } = req.body;
    const user = await userDao.getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
         code: "User not found",
         message: `Uživatel s tímto e-mailem neexistuje!`,
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = LoginAbl;
