require("dotenv").config();

const config = {
  port: process.env.PORT,
  connection_url: process.env.MONGO_CONNECTION_STRING,
  api_version: process.env.VERSION,
  mail_address: process.env.MAIL_ADDRESS,
  whitelist_urls: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_BACKUP, "http://localhost:3000"],
};

module.exports = Object.freeze(config);
