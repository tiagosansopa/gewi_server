const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
  },
  address: {
    type: String,
  },
  number: {
    type: String,
  },
  img: {
    type: String,
  },
  tenants: [{ type: ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Property", propertySchema, "properties");
