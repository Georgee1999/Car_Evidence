const express = require("express");
const router = express.Router(); 


const CreateAbl = require("../abl/user/createAbl");
const ListAbl = require("../abl/user/listAbl");
const getUserCars = require("../abl/user/getUsersCarsAbl");



router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.get("/get", getUserCars);

module.exports = router;

