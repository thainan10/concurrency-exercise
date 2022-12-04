const express = require("express");
const { getDateRange } = require("../../middleware/get-date-range");

const adminRouter = express.Router();

adminRouter.use(getDateRange);

adminRouter.get("/best-profession", require("./get-best-profession"));
adminRouter.get("/best-clients", require("./get-best-clients"));

module.exports = adminRouter;
