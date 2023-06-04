const mongoose = require("mongoose");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const User = require("./user");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: { type: ObjectId, ref: "User" },
    receiver: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema, "messages");
