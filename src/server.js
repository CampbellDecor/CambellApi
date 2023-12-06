const express = require('express');
const cors = require("cors");
const CookieParser = require("cookie-parser");
const cambellRouter = require('./router/routes.js');
const {PORT} = require('./config/BasePath.js');
//Middleware
const campellApiApp = express();
campellApiApp.use(cors()); // provide cros platform control
campellApiApp.use(express.json()); //provide jsonparser
campellApiApp.use(CookieParser()); //provide cookie-parser
campellApiApp.use("/api", cambellRouter); //routing





//Server
campellApiApp.listen(PORT??5000, () => {
    console.log("Server is Start");

})
