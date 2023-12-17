const express = require('express');
const {
    all,
    nameSearch,
    add
} = require("../controller/Packages.js");

const Router = express.Router();
Router.get("/", all);
Router.get('/:packname', nameSearch);
Router.post("/", add);
module.exports = Router;
