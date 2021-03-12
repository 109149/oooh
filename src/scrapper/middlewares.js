const logger = require("./logger");

const _requestLogger = (request, response, next) => {
  const msg = {
    Method: request.method,
    Path: request.path,
    IP: request.ip,
    Body: request.body,
    Protocol: request.protocol,
    "Secure Connection": request.secure,
    "Content-Type": request.get("Content-Type") || "",
  };
  logger.info(msg);
  next();
};

const _unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const _errorHandler = (error, request, response, next) => {
  // error.stack

  const msg = {
    ERROR: error.message,
    IP: request.ip,
    Method: request.method,
    "Original URL": request.originalUrl,
    Body: request.body,
    Params: request.params,
    Query: request.query,
    stack: error.stack,
  };
  logger.error(msg, error.message);

  if (error.name === "CastError")
    return response.status(400).json({ error: "invalid id" });
  else if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  else if (error.name === "TypeError")
    return response.status(500).json({ error: "Internal Error" });
  else if (error.name === "NoPasswordProvided")
    return response.status(400).json({ error: error.message });
  else if (error.name === "InvalidUsernameOrPassword")
    return response.status(401).json({ error: error.message });
  else if (error.name === "JsonWebTokenError")
    return response.status(401).json({ error: error.message });
  // else if (error.name === "markedEmptyContent")
  //   return response.status(400).json({ error: "content must not be empty" });

  // return response.status(400).json({ error: "FF" });

  // console.log("NAME", error.name);
  next(error);
};

module.exports = {
  _requestLogger,
  _unknownEndpoint,
  _errorHandler,
};
