const express  =require( 'express');
const UserContoller =require( '../controller/user');
const userConttoller=new UserContoller();

const Router=express.Router();
Router.post("/add",userConttoller.add);
Router.route( "/" )
        .post( UserContoller.getUsers);


export default Router;