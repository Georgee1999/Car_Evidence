const express = require("express");
const router = express.Router();


const CreateAbl = require("../abl/car/createAbl");
const ListAbl = require("../abl/car/listAbl");
const DeleteAbl = require("../abl/car/deleteAbl");
const GetCarsByEmailAbl = require("../abl/car/getCarsByEmailAbl");



router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.delete("/delete", DeleteAbl);
router.post("/cars-by-email", GetCarsByEmailAbl);


module.exports = router;