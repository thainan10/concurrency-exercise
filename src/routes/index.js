const express = require("express");

const router = express.Router();

router.use("/contracts", require("./contracts"));
router.use("/jobs", require("./jobs"));
router.use("/balances", require("./balances"));

module.exports = router;
