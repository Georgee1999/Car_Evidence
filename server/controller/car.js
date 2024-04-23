const express = require("express");
const router = express.Router();


const CreateAbl = require("../abl/car/createAbl");
const ListAbl = require("../abl/car/listAbl");


router.post("/create", CreateAbl);
router.get("/list", ListAbl);

module.exports = router;