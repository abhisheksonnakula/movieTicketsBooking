const express = require("express");
const { theatre } = require("../controllers/theatre");
const router = express.Router();

router.post("/", theatre);
module.exports = router;