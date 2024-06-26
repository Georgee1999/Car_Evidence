const fs = require("fs"); 
const path = require("path"); 
const crypto = require("crypto");

const carFolderPath = path.join(__dirname, "storage", "carList");

// Method to write an car to a file
function create(car) {
    try {
      const filePath = path.join(carFolderPath, `${car.SPZ}.json`);
      const fileData = JSON.stringify(car);
      fs.writeFileSync(filePath, fileData, "utf8");
      return car;
    } catch (error) {
      throw { code: "failedToCreateCar", message: error.message };
    }
  }

 // Metoda pro získání aut podle emailu
function getCarsByEmail(email) {
  try {
    const files = fs.readdirSync(carFolderPath);
    const cars = files.map((file) => {
      const fileData = fs.readFileSync(path.join(carFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return cars.filter((car) => car.email === email);
  } catch (error) {
    throw { code: "failedToListCars", message: error.message };
  }
}


  // Method to list users in a folder
function list() {
  try {
    const files = fs.readdirSync(carFolderPath);
    const carList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(carFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return carList;
  } catch (error) {
    throw { code: "failedToListCars", message: error.message };
  }
}



function remove(car) {
  try {
    const filePath = path.join(carFolderPath, `${car}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    console.log(error);
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveCar", message: error.message };
  }
}

  module.exports = {
    create,
    list,
    remove,
    getCarsByEmail
  }