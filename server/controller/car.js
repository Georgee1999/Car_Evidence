const express = require("express");
const router = express.Router();


const CreateAbl = require("../abl/car/createAbl");
const ListAbl = require("../abl/car/listAbl");
const DeleteAbl = require("../abl/car/deleteAbl");


router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.delete("/delete", DeleteAbl);

module.exports = router;