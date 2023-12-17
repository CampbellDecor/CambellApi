const express = require('express');
const {
    allEvents,
    addEvents,
    deleteEvent,
    editEvents
} = require("../controller/Events.js");

const Router = express.Router();
Router.get('/', allEvents);
Router.post('/', addEvents);
Router.delete('/:eventid', deleteEvent);
Router.put('/', editEvents);
module.exports = Router;
