const express = require("express");
const auth = require("../middlewares/auth");
const { registerAdmin, getAdmin, authAdmin } = require("../controllers/adminControllers"); 

const router = express.Router();

router.post("/register", auth, registerAdmin); // add an account to admin
router.get("/", auth, getAdmin);
router.post("/login", authAdmin);

module.exports = router;