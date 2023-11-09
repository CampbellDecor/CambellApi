const express = require('express');
const serviceContoller = require('../controller/Service');

const Router = express.Router();

Router.get("/", serviceContoller.getServices);
Router.post("/", serviceContoller.addService);
Router.get("/:serviceId", serviceContoller.getService);
module.exports = Router;
