const mongoose = require("mongoose");
const User = require("../models/user");
const Property = require("../models/property");

exports.readAll = (req, res) => {
  console.log("getAllProperties");
  Property.find()
    .then((properties) => {
      return res.status(200).json({
        message: "list of properties",
        properties,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        error: "failed getting property list",
      });
    });
};

exports.write = (req, res) => {
  console.log("write new property");
  const { name, address, number, img, tenants } = req.body;
  const newProperty = new Property({
    name,
    address,
    number,
    img,
    tenants,
  });

  newProperty
    .save()
    .then((savedProperty) => {
      return res.status(200).json({
        message: "Saved property",
      });
    })
    .catch((error) => {
      return res.status(401).json({
        error: "Failed to save property",
      });
    });
};
