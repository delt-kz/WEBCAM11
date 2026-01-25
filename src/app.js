require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { itemsRouter } = require("./routes/items");
const { notFoundHandler, errorHandler } = require("./middleware/errors");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    return res.json({
      message: "Backend API is running",
      endpoints: {
        items: "/api/items",
      },
    });
  });

  app.use("/api/items", itemsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

