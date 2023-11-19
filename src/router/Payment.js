const express = require('express');
const PayContoller = require('../controller/PaymentHistory.js');

const Router = express.Router();

Router.get('/', PayContoller.all);
module.exports = Router;
