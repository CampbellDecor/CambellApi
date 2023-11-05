const adminChatController = require("../controller/adminchat");
const express = require('express');

const Router = express.Router();

Router.get('/', adminChatController.chatlist);
Router.get('/unreadcount', adminChatController.unreadcount);
Router.get('/', adminChatController.chatlist);
Router.get("/:senderid", adminChatController.chatssender);
module.exports = Router;
