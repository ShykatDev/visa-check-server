require("dotenv").config();

const config = {
  port: process.env.PORT,
  connection_url: process.env.MONGO_CONNECTION_STRING,
  api_version: process.env.VERSION,
};

module.exports = Object.freeze(config);
