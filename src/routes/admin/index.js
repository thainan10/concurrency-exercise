const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/best-profession", require("./get-best-profession"));
adminRouter.get("/best-clients", require("./get-best-clients"));

module.exports = adminRouter;
