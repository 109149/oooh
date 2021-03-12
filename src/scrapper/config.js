const winston = require("winston");
const helpers = require("./helpers");

const {
  logFormatTemplate,
  combinedFileFormatTemplate,
  errorFileFormatTemplate,
} = helpers;

const { format, transports } = winston;
const logFormat = format.printf(logFormatTemplate());
const combinedFileFormat = format.printf(combinedFileFormatTemplate());
const errorFileFormat = format.printf(errorFileFormatTemplate());

const level = process.env.NODE_ENV === "production" ? "info" : "debug";

const _transports = [
  new transports.Console({
    format: format.combine(format.colorize(), logFormat),
  }),
];

const logger = winston.createLogger({
  level,
  format: format.combine(
    format.json(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({
      fillExcept: ["message", "level", "timestamp", "msgObj"],
    }),
    format.align()
  ),
  transports: _transports,
});

const winstonLogger = {
  logger,
  level,
};

const PORT = 4000;

module.exports = {
  winstonLogger,
  PORT,
};
