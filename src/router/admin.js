const express = require('express');
const adminContoller = require('../controller/Admin.js');

const Router = express.Router();

Router.get("/login", adminContoller.AuthAdmin);
Router.get("/logout", adminContoller.LogoutAdmin);
Router.post("/add", adminContoller.addAdmin);
Router.get("/:aid", adminContoller.getAdmin);
Router.get("/", adminContoller.getAdmins);
module.exports = Router;
