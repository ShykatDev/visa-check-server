const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "shykatfp73@gmail.com",
    pass: "aaprdpavdnvagsro",
  },
});

const sendMail = async (to, sub, msg) => {
  transporter.sendMail({
    to,
    subject: sub,
    html: msg,
  });
};

module.exports = sendMail;
