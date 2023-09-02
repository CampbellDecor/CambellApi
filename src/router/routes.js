const service = require( "./Service.js" );
const admin = require("./admin.js" );
const express = require( "express" );
const Router=express.Router();
Router.use( "/admin", admin);
Router.use( "/service",service);

module.exports=Router;