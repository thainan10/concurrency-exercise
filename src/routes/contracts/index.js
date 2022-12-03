const express = require("express");
const {
  getProfile: getProfileMiddleware,
} = require("../../middleware/get-profile");

const contractsRouter = express.Router();

contractsRouter.use(getProfileMiddleware);

contractsRouter.get("/:id", require("./get-contract-by-id"));
contractsRouter.get("/", require("./get-contracts"));

module.exports = contractsRouter;
