const {
    send,
    list,
    chats,
    Searchadmin
} = require("../controller/adminchat.js");
const express = require('express');

const Router = express.Router();

Router.get("/", list);
Router.post("/", send);
Router.get("/:aid", chats);
Router.get("/search/:search", Searchadmin)
module.exports = Router;
