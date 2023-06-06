const mongoose = require("mongoose");
const crpto = require("crypto");
const { ObjectId } = mongoose.Schema;

const User = require("./user");
const { timeStamp } = require("console");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    content: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema,
  "notifications"
);
