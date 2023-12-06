const service = require('./Service.js');
const admin = require('./admin.js');
const user = require('./user.js');
const Booking = require('./Bookings.js');
const Event = require('./Event.js');
const Package = require('./Package.js');
const express = require('express');
const Router = express.Router();

Router.use('/admin', admin);
Router.use('/service', service);
Router.use('/user', user);
Router.use('/booking', Booking);
Router.use('/event', Event);
Router.use('/pack', Package);
module.exports = Router;
