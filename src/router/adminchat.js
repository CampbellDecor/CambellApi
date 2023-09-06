const userChatController = require( "../Model/adminchats" );
const express  =require( 'express');

const Router=express.Router();

// Router.post("/add",userConttoller.add);
Router.route( "/:uid" )
        .post(userChatController.add);

module.exports=Router;