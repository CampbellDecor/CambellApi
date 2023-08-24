const express  =require( 'express');
const adminContoller =require( '../controller/user');

const Router=express.Router();

// Router.post("/add",userConttoller.add);
Router.route( "/" )
        .post( adminContoller.getadmins);

Router.route("/:uid")
.post(adminContoller.getadmin)
.delete(UserContoller.getadmin)
        .put( UserContoller.getUser )

export default Router;