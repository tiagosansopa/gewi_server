const express = require("express");
const router = express.Router();

//import validators

//import controllers
const { send, getChat, getChatList } = require("../controllers/message");

//routes
router.post("/send", send);
router.post("/chat", getChat);
router.post("/chats", getChatList);

module.exports = router;
