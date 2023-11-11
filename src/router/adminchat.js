const {send,list,chats}= require("../controller/adminchat.js");
const express = require('express');

const Router = express.Router();

Router.get("/", list);
Router.post("/", send);
Router.get("/:aid", chats);
module.exports = Router;
