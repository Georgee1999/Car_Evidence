const fs = require("fs"); 
const path = require("path"); 
const crypto = require("crypto");

const carFolderPath = path.join(__dirname, "storage", "carList");



// Method to write an car to a file
function create(car) {
    try {
      car.id = crypto.randomBytes(5).toString("hex");
      const filePath = path.join(carFolderPath, `${car.id}.json`);
      const fileData = JSON.stringify(car);
      fs.writeFileSync(filePath, fileData, "utf8");
      return car;
    } catch (error) {
      throw { code: "failedToCreateCar", message: error.message };
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

  module.exports = {
    create,
    list
  }