const Ajv = require("ajv");
const addFormats = require("ajv-formats").default; 
const ajv = new Ajv();
addFormats(ajv);

const userDao = require("../../dao/user-dao.js"); //obsahuje metody pro manipulaci s uživatelskými daty, jako je vytváření nových uživatelů a jejich výpis.
const { error } = require("ajv/dist/vocabularies/applicator/dependencies.js");

const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 2 },
    lastName: {type: "string", minLength: 2},
    address: {type: "string", minLength: 3}
  },
  required: ["email", "firstName", "lastName","address"],
  additionalProperties: false, //žádné další vlastnosti nejsou povoleny 
};

async function CreateAbl(req, res) {
    try {
      let user = req.body; 

      const userList = userDao.list();//Voláte metodu list z userDao, která vrací seznam všech uživatelů.
      const emailExists = userList.some((u) => u.email === user.email); //Používáte metodu some na seznamu uživatelů k zjištění, zda již existuje uživatel se stejným emailem.
      console.log(user.firstName.length);
      if (emailExists) {
        res.status(400).json({
          code: "emailAlreadyExists",
          message: `Uživatel s tímto e-mailem: ${user.email} již existuje!`,
        });
        return;
      }else if(user.firstName.length < 2){
        res.status(400).json({
          code: "badFirstNameInput",
          message: `Jméno musí obsahovat minimálně 2 znaky!`,
        });
        return;
      }else if(user.lastName.length < 2){
        res.status(400).json({
          code: "badFirstNameInput",
          message: `Příjmení musí obsahovat minimálně 2 znaky!`,
        });
        return;
      }else if(user.address.length < 3){
        res.status(400).json({
          code: "badFirstNameInput",
          message: `Adresa musí obsahovat minimálně 3 znaky!`,
        });
        return;
      }

      //validate input
      const valid = ajv.validate(schema, user);// Tato metoda zkontroluje, zda data uživatele odpovídají schématu.
      if (!valid) {
        res.status(400).json({
          code: "dtoInIsNotValid",
          message: "Nesprávně vyplněné údaje!",
          validationError: ajv.errors,
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

