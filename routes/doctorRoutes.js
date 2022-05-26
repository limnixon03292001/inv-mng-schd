const express = require("express");
const auth = require("../middlewares/auth");
const { registerDoctor, getDoctor, addSchedule, getSchedule, getPublicSchedule, deleteDoctor } = require("../controllers/doctorControllers"); 

const router = express.Router();

router.post("/register", auth, registerDoctor);
router.get("/", auth, getDoctor);
router.delete("/", auth, deleteDoctor);

//this route is for doctor schedule
router.get("/get-schedule", auth, getSchedule);
router.post("/add-schedule", auth, addSchedule);


//this route is for getting doctor schedule, this a public route meaning user doesn't need to be authenticated to access this route
router.get("/get-public-schedule", getPublicSchedule);


module.exports = router;