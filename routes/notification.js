const express = require("express");
const router = express.Router();

//import validators
//import controllers

const { getAllByUser, send } = require("../controllers/notification");

//routes

router.post("/notification", getAllByUser);
router.post("/notification/send", send);

module.exports = router;
