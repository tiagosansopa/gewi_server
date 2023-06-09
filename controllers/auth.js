const User = require("../models/user");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const { expressjwt: ejwt } = require("express-jwt");
const _ = require("lodash");
const {
  registerEmailParams,
  forgotPasswordEmailParams,
} = require("../helpers/email");
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
        newUser
          .save()
          .then((user) => {
            return res.json({
              message: "Registration complete. Please log in",
            });
          })
          .catch((error) => {
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
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: "Incorrect password",
        });
      }

      // generate token with user name email and password
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          role: user.role,
          img: user.img,
          amenities: user.amenities,
          theme: user.theme,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const { _id, name, email, role, img, amenities, theme } = user;
      return res.json({
        token,
        user: { _id, name, email, role, img, amenities, theme },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        error: `Please try again.`,
      });
    });
};

exports.requireSignIn = ejwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.auth._id;
  User.findOne({ _id: authUserId })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: `Please try again.`,
      });
    });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.auth._id;

  User.findOne({ _id: adminUserId })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      if (user.role !== "admin") {
        return res.status(400).json({
          error: "Not Admin. Access denied",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: `Please try again.`,
      });
    });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      console.log("found user", user);

      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "5m",
        }
      );

      const params = forgotPasswordEmailParams(email, token);
      user
        .updateOne({ resetPasswordLink: token })
        .then((user) => {
          console.log("updated user ", user);

          const sendEmail = ses
            .sendEmail(params)
            .promise()
            .then((data) => {
              console.log("ses reset pw ", data);
              return res.json({
                message: `Email sent to ${email}. Click on the link to reset your password`,
              });
            })
            .catch((error) => {
              console.log("error ", error);
              return res.status(400).json({
                message: "Password reset failed",
              });
            });
        })
        .catch((error) => {
          console.log("error ", error);
          return res.status(400).json({
            message: "Password reset failed",
          });
        });
    })
    .catch((error) => {
      console.log(Error);
      return res.status(401).json({
        error: "user not found",
      });
    });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      (err, decoded) => {
        console.log(err);
        if (err) {
          return res.status(401).json({
            error: "Expired link, please try registering again",
          });
        }

        User.findOne({ resetPasswordLink })
          .then((user) => {
            console.log("reset password for user found", user);

            const updatedFields = {
              password: newPassword,
              resetPasswordLink: "",
            };

            user = _.extend(user, updatedFields);

            user
              .save()
              .then((user) => {
                console.log("updated password");
                return res.json({
                  message: "updated password",
                });
              })
              .catch((err) => {
                return res.status(400).json({
                  error: `Please try again.`,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            return res.status(401).json({
              error: `Please try again. Invalid token`,
            });
          });
      }
    );
  }
};
