const express = require("express");
const divisionController = require("../controllers/division.controller");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

router.post("/add", authenticateToken, divisionController.addDivision);
router.get("/", authenticateToken, divisionController.getDivisions);

module.exports = router;
