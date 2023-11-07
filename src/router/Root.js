const express = require('express');
const Root = require('../controller/Root.js');

const Router = express.Router();

Router.get('/countpanel', Root.countpanel);
Router.get('/religionNames', Root.religionNames);

module.exports = Router;
