const express = require('express');
const {add,all,remove,update,passwordReset} = require('../controller/Admin.js');
const Router = express.Router();
Router.post("/", add);
Router.get("/",all);
Router.put("/", update);
Router.delete("/", remove);
Router.post("/reset", passwordReset);
module.exports = Router;
