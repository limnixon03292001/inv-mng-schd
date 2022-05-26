const express = require("express");
const auth = require("../middlewares/auth");
const { addNotif, getNotif } = require("../controllers/notifControllers");

const router = express.Router();

router.post("/add-notif", auth, addNotif);
router.get("/", auth, getNotif);


module.exports = router;