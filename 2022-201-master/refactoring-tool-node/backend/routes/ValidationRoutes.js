const express = require("express");
const router = express.Router();
const { validationController } = require("../controllers/ValidationController");

router.get("/validation", validationController);

module.exports = router;
