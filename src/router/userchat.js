const express  =require( 'express');
const UserChatContoller =require( '../controller/UserChat.js');

const Router=express.Router();
Router.get( "/", UserChatContoller.allchat );
Router.get("/:senderId", UserChatContoller.userchat);
module.exports=Router;
