const BookController = require('../controller/Booking.js');
const express = require('express');

const Router = express.Router();
Router.get('/', BookController.getBookings);
Router.get('/recent', BookController.getRecentBooking);
module.exports = Router;
