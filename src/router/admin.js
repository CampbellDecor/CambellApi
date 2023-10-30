const express  =require( 'express');
const adminContoller =require( '../controller/Admin.js');

const Router=express.Router();

Router.post("/login", adminContoller.AuthAdmin);
Router.post( "/add", adminContoller.addAdmin );
Router.get( "/", adminContoller.getAdmins);
module.exports=Router;
