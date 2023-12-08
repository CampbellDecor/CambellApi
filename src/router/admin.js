const express = require('express');
const adminContoller = require('../controller/Admin.js');
const Router = express.Router();

Router.get("/login", adminContoller.AuthAdmin);
Router.get("/logout", adminContoller.LogoutAdmin);
Router.post("/add", adminContoller.addAdmin);
Router.get("/:aid", adminContoller.getAdmin);
Router.get("/", adminContoller.getAdmins);
Router.delete("/:aid", adminContoller.deleteAdmin);
Router.put("/", adminContoller.editAdmin);
Router.post("/block/:aid", adminContoller.blockAdmin);
Router.post("/unblock/:aid", adminContoller.unblockAdmin);
Router.post("/resetpw", adminContoller.resetpw);
Router.get("/auth/all", adminContoller.auth);
module.exports = Router;
