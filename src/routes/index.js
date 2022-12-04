const express = require("express");

const router = express.Router();

router.use("/contracts", require("./contracts"));
router.use("/jobs", require("./jobs"));

module.exports = router;
