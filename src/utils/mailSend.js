const nodemailer = require("nodemailer");
const config = require("./utils.js");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: config.mail_address,
    pass: config.mail_auth,
  },
});

const sendMail = async (to, sub, msg) => {
  transporter.sendMail({
    from: '"Sebaprobashi" <sebaprobashibd@gmail.com>',
    to,
    subject: sub,
    html: msg,
  });
};

module.exports = sendMail;
