require("dotenv").config();

const config = {
  port: process.env.PORT,
  connection_url: process.env.MONGO_CONNECTION_STRING,
  api_version: process.env.VERSION,
  mail_address: process.env.MAIL_ADDRESS,
  frontend_url: process.env.FRONTEND_URL || `http://localhost:3000`,
};

module.exports = Object.freeze(config);
