const mongoose = require("mongoose");
const User = require("../models/user");
const Notification = require("../models/notifications");
const user = require("../models/user");

exports.getAllByUser = (req, res) => {
  const { user } = req.body;
  console.log(`get all notifications from userId ${user}`);
  Notification.find({
    user,
  })
    .then((notifications) => {
      return res.status(200).json({
        message: "get all notifications",
        notifications,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        error: "failed getting all notifications",
      });
    });
};

exports.send = (req, res) => {
  const { user, content } = req.body;
  const newNotification = new Notification({ user, content });

  newNotification
    .save()
    .then((saved) => {
      return res.status(200).json({
        message: "Notification sent",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        error: "Failed to send notification",
      });
    });
};
