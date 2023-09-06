const express  =require( 'express');
const serviceContoller =require( '../controller/Service');

const Router=express.Router();

Router.route( "/" )
        .post( serviceContoller.getServices);
Router.post( "/upload", serviceContoller.ImgUpload );
Router.route("/:sid")
.post(serviceContoller.getService)
 .delete(serviceContoller.deleteService)
//         .put( UserContoller.getUser )

module.exports=Router;