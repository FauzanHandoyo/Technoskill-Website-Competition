const express = require("express");
const managerController = require("../controllers/manager.controller"); 
const router = express.Router();

router.post("/register", managerController.registerManager);
router.post("/login", managerController.loginManager);
router.post("/change-password", managerController.changePassword);




module.exports = router;
