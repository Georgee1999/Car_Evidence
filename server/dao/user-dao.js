const fs = require("fs"); // můžete číst ze souborů, zapisovat do souborů, mazat soubory atd.
const path = require("path"); // pro práci s cestami k souborům.
const crypto = require("crypto"); // používá pro generování unikátních identifikátorů pro uživatele pomocí crypto.randomBytes. Metoda randomBytes generuje kryptograficky silnou posloupnost náhodných bytů (v tomto případě 16 bytů), které jsou pak převedeny na řetězec ve šestnáctkovém formátu pomocí toString("hex").

const userFolderPath = path.join(__dirname, "storage", "userList"); // __dirname = obsahuje absolutní cestu k adresáři, kde se nachází aktuálně vykonávaný soubor

// Method to write an user to a file
function create(user) {
    try {
      user.id = crypto.randomBytes(16).toString("hex");
      const filePath = path.join(userFolderPath, `${user.id}.json`);
      const fileData = JSON.stringify(user);
      fs.writeFileSync(filePath, fileData, "utf8");
      return user;
    } catch (error) {
      throw { code: "failedToCreateUser", message: error.message };
    }
  }

  module.exports = {
    create
  };




