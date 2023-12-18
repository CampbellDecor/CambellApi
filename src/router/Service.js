const express = require('express');
const serviceContoller = require('../controller/Service');

const Router = express.Router();

Router.get("/", serviceContoller.getServices);
Router.post("/main", serviceContoller.addCategory);
Router.post("/SubService/:servicecode", serviceContoller.addService);

module.exports = Router;
