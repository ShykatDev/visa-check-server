// Entry point of the server code
const config = require("./utils/utils.js");
const mongoose = require("mongoose");
const app = require("./app.js");

const startServer = async () => {
    console.log("🟡 Connecting to Database...");
    try {
        await mongoose.connect(config.connection_url);
        console.log("🟢 Database connected");
    } catch (err) {
        console.log("🔴 Failed to connect to database", err);
        process.exit(1); // Exit the process if unable to connect
    }
};

app.listen(config.port, () => {
    startServer().then(() => console.log(`🟣 Server started on http://localhost:${config.port}`))
});
