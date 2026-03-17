const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Don't crash the server
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Don't crash the server
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
