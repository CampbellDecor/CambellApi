const adminChatController = require( "../controller/adminchat" );
const express  =require( 'express');

const Router=express.Router();

Router.get('/', adminChatController.chatlist);

module.exports=Router;
