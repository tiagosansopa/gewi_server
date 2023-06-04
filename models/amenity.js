const mongoose = require("mongoose");
const crypto = require("crypto");

const amenitySchema = new mongoose.Schema({
  id: Number,
  img: String,
  name: String,
  description: String,
  capacity: Number,
  services: [String],
  schedule: {
    open: String,
    close: String,
  },
  weekdays: [String],
});

module.exports = mongoose.model("Amenity", amenitySchema, "amenities");
