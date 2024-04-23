const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/user/createAbl");

router.post("/create", CreateAbl);
