const BookController = require('../controller/Booking.js');
const express = require('express');

const Router = express.Router();
Router.get('/', BookController.getBookings);
Router.post('/todoTask', BookController.addTask);
Router.delete('/todoTask', BookController.deleteTask);
Router.put("/todoTask", BookController.editTask)
Router.get('/all', BookController.allBooking);
module.exports = Router;
