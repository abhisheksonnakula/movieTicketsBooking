const express = require("express");
const { createShow, getShow } = require("../controllers/show");
const router = express.Router();

router.post("/", createShow);
router.get("/:id", getShow);
module.exports = router;