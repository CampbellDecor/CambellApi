const service = require('./Service.js');
const admin = require('./admin.js');
const achats = require('./adminchat.js');
const user = require('./user.js');
const cat = require('./Category.js');
const usercat = require('./userchat.js');
const payment = require('./Payment.js');
const Booking = require('./Bookings.js');
const Root = require('./Root.js');
const Event = require('./Event.js');
const Package = require('./Package.js');
const express = require('express');
const Router = express.Router();

Router.use('/admin', admin);
Router.use('/service', service);
Router.use('/adminchat', achats);
Router.use('/user', user);
Router.use('/cat', cat);
Router.use('/root', Root);
Router.use('/booking', Booking);
Router.use('/userchat', usercat);
Router.use('/payment', payment);
Router.use('/event', Event);
Router.use('/pack', Package);
Router.use('payment', Payment)
Router.use('SocialMedia', Social)
Router.use('Mail', Mail)
module.exports = Router;
