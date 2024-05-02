const Ajv = require("ajv");
const addFormats = require("ajv-formats").default; 
const ajv = new Ajv();
addFormats(ajv);

const userDao = require("../../dao/user-dao.js"); //obsahuje metody pro manipulaci s uživatelskými daty, jako je vytváření nových uživatelů a jejich výpis.

const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 2 },
    lastName: {type: "string", minLength: 2},
    address: {type: "string", minLength: 5}
  },
  required: ["email", "firstName", "lastName","address"],
  additionalProperties: false, //žádné další vlastnosti nejsou povoleny 
};

async function CreateAbl(req, res) {
    try {
      let user = req.body; 
  
      // validate input
      const valid = ajv.validate(schema, user);// Tato metoda zkontroluje, zda data uživatele odpovídají schématu.
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "Nesprávně vyplněné údaje",
          validationError: ajv.errors,
        });
        return;
      }
  
      const userList = userDao.list();//Voláte metodu list z userDao, která vrací seznam všech uživatelů.
      const emailExists = userList.some((u) => u.email === user.email); //Používáte metodu some na seznamu uživatelů k zjištění, zda již existuje uživatel se stejným emailem.
      
      if (emailExists) {
        res.status(400).json({
          code: "emailAlreadyExists",
          message: `Uživatel s tímto e-mailem: ${user.email} již existuje`,
        });
        return;
      }
  
      user = userDao.create(user);
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  module.exports = CreateAbl;

