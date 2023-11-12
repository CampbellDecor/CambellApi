const BookController = require('../controller/Booking.js');
const express = require('express');

const Router = express.Router();
Router.get('/', BookController.getBookings);
Router.post('/todoTask', BookController.addTask);
Router.delete('/todoTask', BookController.deleteTask);
Router.put("/todoTask", BookController.editTask)
Router.get("/todoTask/:bookid", BookController.getTasks)
Router.get('/all', BookController.allBooking);
Router.get('/one/:bookid', BookController.getBooking)
module.exports = Router;
