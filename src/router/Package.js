const express = require('express');
const {
    all
} = require("../controller/Packages.js");

const Router = express.Router();
Router.get("/", all);

module.exports = Router;
