// A simple logging system forked from [https://github.com/CH4R4F/utils/blob/main/logger/logger.js]

const winston = require("winston");
const path = require("path");
const { combine, timestamp, printf } = winston.format;

// Define custom log formats
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// Create separate loggers for different categories
const errorLogger = winston.createLogger({
    level: "error",
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/error/error.log"), // add path to error.log
        }),
    ],
});

const apiLogger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/api/api.log"), // add path to api.log
        }),
    ],
});

// Add console logging in development environment
if (process.env.NODE_ENV === "development") {
    errorLogger.add(new winston.transports.Console());
    apiLogger.add(new winston.transports.Console());
}

// Export the loggers for use in other parts of your application
module.exports = {
    errorLogger,
    apiLogger,
};
