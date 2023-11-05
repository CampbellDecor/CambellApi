const BookController = require('../controller/Booking.js');
const express = require('express');

const Router = express.Router();
Router.get('/', BookController.getBookings);
module.exports = Router;
