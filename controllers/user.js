const User = require("../models/user");
exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.create = (req, res) => {
  console.log("Create user");
  const { username, name, email } = req.body;
  const password = "password";
  const contactList = [
    { _id: "6491e9a7952b44294cf39743" },
    { _id: "6491e9f3952b44294cf39745" },
    { _id: "6491ea0e952b44294cf39747" },
    { _id: "6491ea33952b44294cf39749" },
  ];
  const newUser = new User({
    username,
    name,
    email,
    password,
    contacts: contactList,
  });
  newUser
    .save()
    .then((user) => {
      return res.status(201).json({
        message: "User created",
        user,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error creating user",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const updateFields = { $set: updatedData };
  User.findOne({ _id: id })
    .then((user) => {
      user
        .updateOne(updateFields)
        .then((user) => {
          return res.status(201).json({
            message: "User updated",
            user,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            error,
            message: "Error updating user fields",
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error updating, user not found",
      });
    });
};

exports.del = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete({ _id: id })
    .then((deleted) => {
      return res.status(201).json({
        message: "User deleted",
        deleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error deleting user",
      });
    });
};

exports.readAmenities = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (user.amenities) {
        return res.status(200).json({
          message: "list of fav amenities",
          amenities: user.amenities,
        });
      } else {
        return res.status(200).json({
          message: "list of fav amenities empty",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "Error amenities not found",
      });
    });
};

exports.updateAmenities = (req, res) => {};

exports.deleteAmenities = (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  console.log("updated data");
  User.findByIdAndUpdate(
    userId,
    { $pull: { elements: elementId } },
    { new: true }
  )
    .then((user) => {
      console.log("i updated", user);
    })
    .catch((error) => {
      return res.status(500).json({
        error,
        message: "error updating data",
      });
    });
};
