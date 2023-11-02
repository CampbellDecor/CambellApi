const express = require('express');
const PayContoller = require('../controller/PaymentHistory.js');

const Router = express.Router();

Router.get("/history/year/:year", PayContoller.YearHistory);
Router.get("/history/date/:date", PayContoller.DayHistory);
Router.get("/history/month/:month", PayContoller.MonthHistory);
module.exports = Router;
