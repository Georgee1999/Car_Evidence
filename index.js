const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;


const userController = require("./server/controller/user");
const carController = require("./server/controller/car");


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());

app.use("/user", userController);
app.use("/car", carController);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  