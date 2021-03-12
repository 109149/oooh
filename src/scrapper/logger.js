const { logger, level } = require("./config").winstonLogger;

const simple = (...params) => {
  logger.log({
    level,
    message: [...params].join(" "),
  });
};

const info = (msgObj, ...params) => {
  if (process.env.NODE_ENV !== "test") {
    if (msgObj) {
      logger.log({
        message: [...params].join(" "),
        level,
        msgObj,
      });
    } else {
      simple(params);
    }
  }
};

const error = (msgObj, ...params) => {
  if (process.env.NODE_ENV !== "test") {
    logger.error({
      message: [...params].join(" "),
      msgObj,
    });
  }
};

module.exports = {
  info,
  error,
};
