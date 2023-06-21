const Access = require("../models/access");

exports.getAll = (req, res) => {
  console.log("getAll");

  Access.find({})
    .then((accesses) => {
      return res
        .status(200)
        .json({ message: "Success getting all accesses", accesses });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        error: `Please try again.`,
      });
    });
};

exports.getAllByUser = (req, res) => {
  const id = req.params.id;
  Access.find({ owner: id })
    .then((accessList) => {
      return res.status(200).json({
        accessList,
        message: "Access list from user retrieved",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error finding access list",
      });
    });
};

exports.create = (req, res) => {
  const { owner, contact, property, type, start, finish, status } = req.body;
  const newAccess = new Access({
    owner,
    contact,
    property,
    type,
    start,
    finish,
    status,
  });

  newAccess
    .save()
    .then((access) => {
      return res.status(201).json({
        message: "Saved access successful",
        contact,
        access,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: "Failed to save property",
        err,
      });
    });
};

exports.validateAccess = (req, res) => {
  const { id } = req.body;
  Access.findOne({ _id: id })
    .populate("owner")
    .populate("contact")
    .populate("property")
    .then((access) => {
      return res.status(200).json({
        message: "todo bien",
        access,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: "Failed to retrieve access",
        err,
      });
    });
};
