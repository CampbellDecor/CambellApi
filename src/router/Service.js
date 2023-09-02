const express  =require( 'express');
const serviceContoller =require( '../controller/Service');

const Router=express.Router();

Router.route( "/" )
        .post( serviceContoller.getServices);

Router.route("/:sid")
.post(serviceContoller.getService)
 .delete(serviceContoller.deleteService)
//         .put( UserContoller.getUser )

module.exports=Router;