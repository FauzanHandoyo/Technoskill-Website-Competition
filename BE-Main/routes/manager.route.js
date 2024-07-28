const express = require("express");
const managerController = require("../controllers/manager.controller"); // Ensure this path is correct
const router = express.Router();

router.post("/register", managerController.registerManager);
router.post("/login", managerController.loginManager);

module.exports = router;
