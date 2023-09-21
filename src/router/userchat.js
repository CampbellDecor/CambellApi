const express  =require( 'express');
const UserChatContoller =require( '../controller/UserChat.js');

const Router=express.Router();
Router.get( "/", UserChatContoller.allchat );
module.exports=Router;