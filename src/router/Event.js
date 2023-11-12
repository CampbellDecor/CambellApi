const express = require('express');
const {
    allEvents
} = require("../controller/Events.js");

const Router = express.Router();
Router.get('/', allEvents);

module.exports = Router;
