const express = require("express");
const auth = require("../middlewares/auth");
const { addPatient, getPatient, searchPatient } = require("../controllers/patientControllers"); 

const router = express.Router();

router.post("/",auth, addPatient);
router.get("/",auth, getPatient);
router.get("/search",auth, searchPatient);
// router.post("/login", authUser);

module.exports = router;