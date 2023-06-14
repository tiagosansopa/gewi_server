const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

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
  amenity: { type: ObjectId, ref: "Amenity" },
});

module.exports = mongoose.model("Booking", bookingSchema, "bookings");
