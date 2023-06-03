const express = require("express");
const router = express.Router();

//import validators later

//import controllers

const { readBookingsByDay } = require("../controllers/booking");

//routes

router.get("/bookings", readBookingsByDay);

module.exports = router;
