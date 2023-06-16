exports.registerEmailParams = (name, email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
              <body>
              <h1>Hello ${name}, please verify your email adress</h1 style="color:red;">
              <p>use the following link: </p>
              <a href="${process.env.CLIENT_URL}/auth/activate/${token}">Asi te llega?</a>
              </body></html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "GEWI: Confirm email",
      },
    },
  };
};
exports.forgotPasswordEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
              <body>
              <h1 style="color:red;"> Password reset link</h1 >
              <p>use the following link: </p>
              <a href="${process.env.CLIENT_URL}/auth/password/reset/${token}">Reset password link</a>
              </body></html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "GEWI: Confirm email",
      },
    },
  };
};
