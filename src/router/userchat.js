const express  =require( 'express');
const {allchat,send,all} =require( '../controller/UserChat.js');

const Router=express.Router();
Router.get( "/", allchat );
Router.post("/", send);
Router.get("/:uid", all);
module.exports=Router;
