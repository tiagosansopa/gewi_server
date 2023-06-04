const express = require("express");
const router = express.Router();

//import validators later

//import controllers

const { readBookingsByDay, createBooking } = require("../controllers/booking");

//routes

router.post("/bookings", readBookingsByDay);
router.post("/book", createBooking);
module.exports = router;
