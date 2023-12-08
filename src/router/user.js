const express = require('express');
const UserContoller = require('../controller/user.js');

const Router = express.Router();


Router.post("/add", UserContoller.adduser);
Router.post("/block", UserContoller.blockUser);
Router.get("/block/:block", UserContoller.filter_block_unblock);
Router.post("/unblock", UserContoller.unblockUser);
Router.get("/", UserContoller.getUsers);
Router.get("/:uid", UserContoller.getUser);
Router.get("/religion/:relg", UserContoller.religion_filter)
Router.put('/edit', UserContoller.editUser);
Router.get('/hints/list', UserContoller.seachHint);
Router.get('/search/:search', UserContoller.search);
Router.get('/book/:uid', UserContoller.userBook);
Router.get('/bookDetails/:uid', UserContoller.BookUser);
module.exports = Router;
