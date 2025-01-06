const express = require("express");
const router = require("./routes/router.js");
const cors = require("cors");
const config = require("./utils/utils.js");
const cron = require("node-cron");
const path = require("path");
const fs = require("fs");

const app = express();

const uploadDir = path.resolve(__dirname, "./uploads");

//cron jobs
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(uploadDir)) {
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(uploadDir, file), (err) => {});
      }
    });
  }
  console.log("⭕ Delete all upload files");
});

// Define CORS options
const corsOptions = {
  origin: config.frontend_url, // Frontend origin
  credentials: true, // Allow sending cookies
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.get("/", (req, res) => {
    res.send("Welcome to the API v.1.2");
});

app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(`${config.api_version}`, router);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

module.exports = app;
