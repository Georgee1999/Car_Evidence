const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000;

//const eventController = require("./controller/event");
//const userController = require("./controller/user");
//const attendanceController = require("./controller/attendance");
//const messageController = require("./controller/message");
//const noteController = require("./controller/note");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  