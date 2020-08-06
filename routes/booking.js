const express = require("express");
const auth = require("../middlewares/auth");
const log = require("../middlewares/log");
const { makeBooking, updateBooking } = require("../controllers/booking");
const { update } = require("lodash");
const router = express.Router();
router.post("/", auth, log, makeBooking);
router.put("/", auth, log, updateBooking);
module.exports = router;