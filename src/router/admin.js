const express  =require( 'express');
const adminContoller =require( '../controller/Admin.js');

const Router=express.Router();

Router.post( "/login", adminContoller.loginAdmin );
Router.post( "/add", adminContoller.addAdmin );
module.exports=Router;