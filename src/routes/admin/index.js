const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/best-profession", require("./get-best-profession"));

module.exports = adminRouter;
