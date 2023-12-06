const express = require('express');
const {
    add,
    all,
    remove,
    update
} = require('../controller/user.js');
const Router = express.Router();
Router.post("/", add);
Router.get("/", all);
Router.put("/", update);
Router.delete("/", remove);
module.exports = Router;
