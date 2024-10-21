const express = require("express");
const router = require("./routes/router.js");
const cors = require("cors");
const config = require("./utils/utils.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(`${config.api_version}`, router);

module.exports = app;
