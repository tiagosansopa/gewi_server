const mongoose = require("mongoose");
const Contact = require("../models/contact");
const User = require("../models/user");
exports.create = (req, res) => {
  console.log("create contact");
  const { name, lastName, phone, id } = req.body;
  const newContact = new Contact({ name, lastName, phone });
  newContact
    .save()
    .then((contact) => {
      User.findByIdAndUpdate(
        { _id: id },
        { $push: { contacts: newContact } },
        { new: true }
      )
        .then((user) => {
          return res.status(201).json({
            message: "Contact created",
            contact,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            error,
            message: "Error creating contact",
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error creating contact",
      });
    });
};

exports.readOne = (req, res) => {
  const id = req.params.id;
  console.log("read one contact");
};

exports.readAll = (req, res) => {
  console.log("read all contacts from user");
  const id = req.params.id;
  User.findOne({ _id: id })
    .populate("contacts")
    .then((user) => {
      return res.status(200).json({
        message: "User contacts found",
        contacts: user.contacts,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error finding user",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  console.log("update contact");
};

exports.del = (req, res) => {
  const id = req.params.id;
  console.log("delete contact");
};

exports.validateContact = (req, res) => {
  //update contact
  return res.status(200).json({
    message: "todo bien",
  });
};
