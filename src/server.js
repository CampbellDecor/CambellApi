const express = require('express');
const cors = require("cors");
const cambellRouter = require('./router/routes.js');
const campellApiApp = express();
const CookieParser = require("cookie-parser");
const multer = require("multer");

//Middleware
campellApiApp.use(cors()); // provide cros platform control
campellApiApp.use(express.json()); //provide jsonparser
campellApiApp.use(CookieParser()); //provide cookie-parser
campellApiApp.use("/api", cambellRouter); //routing





//Server

campellApiApp.listen(5000, () => {
    console.log("Server is Start");

})
