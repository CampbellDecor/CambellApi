const express  =require( 'express');
const UserContoller =require( '../controller/user');

const Router=express.Router();

// Router.post("/add",userConttoller.add);
Router.route( "/" )
        .post( UserContoller.getUsers);

Router.route("/:uid")
.post(UserContoller.getUser)
.delete(UserContoller.getUser)
        .put( UserContoller.getUser )

export default Router;