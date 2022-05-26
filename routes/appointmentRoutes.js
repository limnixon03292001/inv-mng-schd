const express = require("express");
const auth = require("../middlewares/auth");
const { addAppointment, getAllAppointment } = require("../controllers/appointmentControllers");

const router = express.Router();


router.post("/add-appointment", auth, addAppointment);
router.get("/", auth, getAllAppointment);


module.exports = router;