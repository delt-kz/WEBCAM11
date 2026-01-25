require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    return res.json({
      message: "Backend API is running",
    });
  });

  return app;
}

module.exports = { createApp };
