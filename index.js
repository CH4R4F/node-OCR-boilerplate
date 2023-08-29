const express = require("express");
const cors = require("cors");
const fileUpload = require("./middlewares/fileUpload");
const errorHandler = require("./middlewares/errorHandler");
const { apiLogger, errorLogger } = require("./utils/logger");

// init server and middleware
const app = express();
app.use(express.json());
app.use(cors()); // you can strictly specify CORS configs here

// upload route
app.post("/api/upload", fileUpload.single("image"), async (req, res, next) => {
    const img = req.file;

    if (!img) {
        apiLogger.error("Image required");
        next(new Error("Image required"));
    }

    // TODO: implement img recognition logic here
});

// error handler
app.use(errorHandler);

app.listen(3001, () => console.log(`server running on port 3001`));
