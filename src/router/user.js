const express  =require( 'express');
const UserContoller =require( '../controller/user');
const userConttoller=new UserContoller();

const Router=express.Router();
Router.post("/add",userConttoller.add);
Router.route( "/" )
        .post( userConttoller.getAll );
Router.route("/:id")
        .delete(userConttoller.delete)
        .put( userConttoller.edit )
        .post(userConttoller.)
        
Router.post("/sigin",userConttoller.login);
Router.post("/sigout",userConttoller.logout);
export default Router;