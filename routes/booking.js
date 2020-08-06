const express = require("express");
const auth = require("../middlewares/auth");
const { makeBooking } = require("../controllers/booking");
const router = express.Router();
router.post("/", auth, makeBooking);
module.exports = router;