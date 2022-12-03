const express = require("express");

const router = express.Router();

router.use("/contracts", require("./contracts"));

module.exports = router;
