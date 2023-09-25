const CatController = require( "../controller/category" );

const express  =require( 'express');

const Router = express.Router();
Router.get( "/", CatController.all );

module.exports = Router;   