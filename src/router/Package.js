const express = require('express');
const {
    all,nameSearch
} = require("../controller/Packages.js");

const Router = express.Router();
Router.get("/", all);
Router.get('/:packname',nameSearch)
module.exports = Router;
