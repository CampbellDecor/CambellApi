
const express = require('express');
const cors=require("cors");
const cambellRouter = require( './router/routes.js' );
const campellApiApp = express();

campellApiApp.use(cors()); // provide cros platform control
//express json body
campellApiApp.use(express.json());

//routing
campellApiApp.use( "/api", cambellRouter );
campellApiApp.listen(5000,()=>{
    console.log("Server is Start");
    
})