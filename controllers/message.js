const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");

exports.send = (req, res) => {
  const { sender, receiver, message } = req.body;
  console.log(`sending ${message} from ${sender} and ${receiver}`);
  const newMessage = new Message({ sender, receiver, message });

  newMessage
    .save()
    .then((saved) => {
      return res.status(200).json({
        message: "Message sent",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        error: "Failed to send message",
      });
    });
};

exports.getChat = (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    console.log(`get the chat from ${senderId} and ${receiverId}`);
    Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .then((chat) => {
        return res.status(200).json({
          message: "Chat retrived",
          chat,
        });
      })
      .catch((error) => {
        return res.status(401).json({
          error: "Failed to send message",
        });
      });
  } catch (error) {
    return res.status(401).json({
      error: "Failed to fetch chat",
    });
  }
};

exports.getChatList = (req, res) => {
  const { receiverId } = req.body;
  const receiver = new mongoose.Types.ObjectId(receiverId);
  try {
    console.log(`get the chats from ${receiverId}`);

    Message.aggregate([
      { $match: { receiver } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$sender",
          message: { $first: "$message" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $project: {
          _id: 0,
          message: 1,
          createdAt: 1,
          "sender.name": 1,
          "sender.email": 1,
          "sender._id": 1,
          "sender.img": 1,
        },
      },
    ])
      .then((lastMessages) => {
        return res.status(200).json({
          message: "Chats retrived",
          lastMessages,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(401).json({
          error: "Failed to fetch latest chats",
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Failed to fetch latest chats",
    });
  }
};
