const express  =require( 'express');
const UserContoller =require( '../controller/user.js');

const Router=express.Router();


Router.post( "/add", UserContoller.adduser);
Router.post( "/block", UserContoller.blockUser );
Router.get( "/block/:block", UserContoller.filter_block_unblock);
Router.post( "/unblock", UserContoller.unblockUser );
Router.get( "/", UserContoller.getUsers );
Router.post( "/:uid", UserContoller.getUser );
module.exports=Router;