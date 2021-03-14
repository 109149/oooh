const express = require("express");
const { scrapTrivia, scrapImageUrls } = require("./scrap");
const { config, logger, middlewares } = require("./");
const { _requestLogger, _unknownEndpoint, _errorHandler } = middlewares;

const { PORT } = config;

const app = express();

if (process.env.NODE_ENV !== "test") app.use(_requestLogger);

app.get("/trivia/:id", async (request, response) => {
  const { trivia, spoilers } = await scrapTrivia(request.params.id);
  response.json({ trivia, spoilers });
});

app.get("/imageUrls/:id", async (request, response) => {
  const imageUrls = await scrapImageUrls(request.params.id);
  response.json({ imageUrls });
});

app.use(_unknownEndpoint, _errorHandler);

app.listen(PORT, () => {
  logger.info(undefined, `[***] server on *:${PORT}`);
});
