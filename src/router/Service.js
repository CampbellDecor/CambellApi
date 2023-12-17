const express = require('express');
const serviceContoller = require('../controller/Service');

const Router = express.Router();

Router.get("/", serviceContoller.getServices);
Router.post("/main", serviceContoller.addCategory);

module.exports = Router;
