const express = require("express");

const balancesRouter = express.Router();

balancesRouter.post("/deposit/:userId", require("./post-deposit"));

module.exports = balancesRouter;
