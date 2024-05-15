const express = require("express");
const router = express.Router(); 


const CreateAbl = require("../abl/user/createAbl");
const ListAbl = require("../abl/user/listAbl");
const getUserCars = require("../abl/user/getUsersCarsAbl");
const LoginAbl = require("../abl/user/loginAbl");



router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.get("/cars", getUserCars);
router.post("/login", LoginAbl); // Přidání nového endpointu


module.exports = router;

