
const express = require('express');
const timeout=require('connect-timeout');
const cors=require("cors");
//const cambellRouter = require( './router/routes' );
const campellApiApp=express();
campellApiApp.use(cors()); // provide cros platform control

campellApiApp.use(express.json());

//routing
//campellApiApp.use("/api",cambellRouter);
campellApiApp.listen(8808,()=>{
    console.log("Server is Start");
    
})