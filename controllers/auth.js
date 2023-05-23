const User = require("../models/user");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const { registerEmailParams } = require("../helpers/email");
const shortId = require("shortid");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.register = (req, res) => {
  // console.log('REGISTER CONTROLLER', req.body);
  const { name, email, password } = req.body;
  // check if user exists in our database

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          error: "email is taken",
        });
      }
      // generate token with user name email and password
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
          expiresIn: "10m",
        }
      );

      //send email
      const params = registerEmailParams(name, email, token);

      const sendEmailOnRegister = ses.sendEmail(params).promise();

      sendEmailOnRegister
        .then((data) => {
          console.log("email submitted to SES", data);
          res.json({
            message: `Email has been sent to ${email}, Follow the instructions to complete your registration.`,
          });
        })
        .catch((error) => {
          console.log("ses email on register", error);
          res.json({
            message: `We could not verify your email: ${email}. Please try again.`,
          });
        });
    })
    .catch((err) => {
      console.log("ses email on register", err);
      res.json({
        message: `We could not verify your email: ${email}. Please try again.`,
      });
    });
};

exports.registerActivate = (req, res) => {
  const { token } = req.body;
  jwt.verify(
    token,
    process.env.JWT_ACCOUNT_ACTIVATION,
    function (err, decoded) {
      if (err) {
        return res.status(401).json({
          error: "Expired link, please try registering again",
        });
      }

      const { name, email, password } = jwt.decode(token);
      const username = shortId.generate();

      User.findOne({ email }).then((user) => {
        if (user) {
          return res.status(401).json({
            error: "Email is taken, please try registering again",
          });
        }
        // create user
        const newUser = new User({ username, name, email, password });
        newUser.save().then((err, result) => {
          if (err) {
            return res.json({
              message: "Registration complete. Please log in",
            });
          }
          return res.status(401).json({
            error: "Error. Try again later",
          });
        });
      });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.table({ email, password });

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please register first.",
        });
      }

      // authenticate
      console.log(password);
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Incorrect password",
        });
      }

      // generate token with user name email and password
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { _id, name, email } = user;
      res.json({
        token,
        user: { _id, name, email },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: `Please try again.`,
      });
    });
};
