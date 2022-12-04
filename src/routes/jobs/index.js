const express = require("express");
const {
  getProfile: getProfileMiddleware,
} = require("../../middleware/get-profile");

const jobsRouter = express.Router();

jobsRouter.use(getProfileMiddleware);

jobsRouter.get("/unpaid", require("./get-unpaid-jobs"));

module.exports = jobsRouter;
