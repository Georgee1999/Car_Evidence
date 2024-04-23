const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000;

const userController = require("./server/controller/user");
const carController = require("./server/controller/car");


app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//app.use(cors());


app.use("/user", userController);
app.use("/car", carController);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  