const service = require( "./Service.js" );
const admin = require( "./admin.js" );
const achats = require( "./adminchat.js" );
const user = require( "./user.js" );
const express = require( "express" );
const Router=express.Router();
Router.use( "/admin", admin);
Router.use( "/service",service);
Router.use("/adminchat",achats);
Router.use("/user",user)
module.exports=Router;