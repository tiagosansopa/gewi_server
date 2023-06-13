const express = require("express");
const router = express.Router();

//import validators later

//import controllers

const {
  readBookingsByMonth,
  createBooking,
} = require("../controllers/booking");

//routes

router.post("/bookings", readBookingsByMonth);
router.post("/book", createBooking);
module.exports = router;
