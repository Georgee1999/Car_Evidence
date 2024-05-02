const Ajv = require("ajv"); //  AJV, což je validátor JSON schémat pro Node.js a prohlížeče, který umožňuje ověřit, že JSON data splňují určitá kritéria definovaná ve schématu.
const addFormats = require("ajv-formats").default; //Formáty mohou být například "email", "uuid", "date-time" apod. Díky tomu můžete v JSON schématech používat tato klíčová slova a validátor bude rozumět jejich formátu.
const ajv = new Ajv(); //Zde vytváříte novou instanci validátoru AJV pomocí konstruktoru, který jste naimportovali v prvním řádku. To vám umožňuje začít definovat JSON schémata a provádět validace.
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
      let user = req.body; //Získáváte tělo požadavku (tj. data odeslaná klientem) a ukládáte je do proměnné user
  
      // validate input
      const valid = ajv.validate(schema, user);////Voláte metodu validate na instanci AJV, kterou jste dříve nakonfigurovali s pomocí schema a objektu user. Tato metoda zkontroluje, zda data uživatele odpovídají schématu.
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

