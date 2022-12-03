const express = require("express");
const {
  getProfile: getProfileMiddleware,
} = require("../../middleware/get-profile");

const contractsRouter = express.Router();

contractsRouter.use(getProfileMiddleware);

contractsRouter.get("/:id", require("./get-contract-by-id"));

module.exports = contractsRouter;
