import express from "express";
import mongoose from "mongoose";

import logger from "../utils/logger.js";

const router = express.Router();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("Connected!"))
  .catch((e) => logger.info("Failed to connect to DB...", e));

router.get("/", (req, res) => {
  res.send("Product Microservice running....");

  logger.info("Testing logger", req);
});

router.get("/health", (req, res) => {
  res.send("Ok");

  logger.info("Testing logger", req);
});

export default router;
