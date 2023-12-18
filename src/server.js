const express = require('express');
const cors = require("cors");
const cambellRouter = require('./router/routes.js');
const campellApiApp = express();
const { fbLikes} = require('./Util/FaceBook/facebook.js');
const CookieParser = require("cookie-parser");


//Middleware
campellApiApp.use(cors()); // provide cros platform control
campellApiApp.use(express.json()); //provide jsonparser
campellApiApp.use(CookieParser()); //provide cookie-parser
campellApiApp.use("/api", cambellRouter); //routing
cambellRouter.use("/CambellFbCount", fbLikes)



//Server

campellApiApp.listen(5000, () => {
    console.log("Server is Start");

})
