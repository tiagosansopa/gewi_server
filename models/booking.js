const mongoose = require("mongoose");
const crypto = require("crypto");

const bookingSchema = new mongoose.Schema({
  eventName: {
    type: String,
  },
  start: {
    type: Date,
  },
  finish: {
    type: Date,
  },
  amenity: {
    type: Number,
  },
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");
