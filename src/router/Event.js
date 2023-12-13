const express = require('express');
const {
    allEvents,
    addEvents,
    deleteEvent
} = require("../controller/Events.js");

const Router = express.Router();
Router.get('/', allEvents);
Router.post('/', addEvents);
Router.delete('/:eventid', deleteEvent);
module.exports = Router;
