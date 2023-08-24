const express  =require( 'express');
const serviceContoller =require( '../controller/Service');

const Router=express.Router();

Router.route( "/" )
        .post( serviceContoller.getServices);

Router.route("/:uid")
// .post(adminContoller.getadmin)
// .delete(UserContoller.getadmin)
//         .put( UserContoller.getUser )

module.exports=Router;