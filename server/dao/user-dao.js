const fs = require("fs"); 
const path = require("path"); 
const crypto = require("crypto"); 

const userFolderPath = path.join(__dirname, "storage", "userList"); // __dirname = obsahuje absolutní cestu k adresáři, kde se nachází aktuálně vykonávaný soubor

// Method to write an user to a file
function create(user) {
    try {
      user.id = crypto.randomBytes(5).toString("hex");
      const filePath = path.join(userFolderPath, `${user.id}.json`);
      const fileData = JSON.stringify(user);
      fs.writeFileSync(filePath, fileData, "utf8");
      return user;
    } catch (error) {
      throw { code: "failedToCreateUser", message: error.message };
    }
  }

  function getUserCars(userId){
    try {
      const filePath = path.join(userFolderPath, `${userId}.json`);
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData);
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw { code: "failedToReadUser", message: error.message };
    }
  }

  function getUserByEmail(email) {
    try {
      const files = fs.readdirSync(userFolderPath);
      for (const file of files) {
        const filePath = path.join(userFolderPath, file);
        const fileData = fs.readFileSync(filePath, "utf8");
        const user = JSON.parse(fileData);
        if (user.email === email) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw { code: "failedToReadUser", message: error.message };
    }
  }

  // Method to list users in a folder
function list() {
    try {
      const files = fs.readdirSync(userFolderPath);
      const userList = files.map((file) => {
        const fileData = fs.readFileSync(path.join(userFolderPath, file), "utf8");
        return JSON.parse(fileData);
      });
      return userList;
    } catch (error) {
      throw { code: "failedToListUsers", message: error.message };
    }
  }



  module.exports = {
    create,
    list,
    getUserCars,
    getUserByEmail
  };




