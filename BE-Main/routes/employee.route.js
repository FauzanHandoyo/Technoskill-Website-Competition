const express = require("express");
const employeeController = require("../controllers/employee.controller");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();

router.post("/add", authenticateToken, employeeController.addEmployee);
router.get("/", authenticateToken, employeeController.getEmployee);
router.get("/:id", authenticateToken, employeeController.getOneEmployee);
router.put("/:id", authenticateToken, employeeController.updateEmployee);
router.delete("/:id", authenticateToken, employeeController.deleteEmployee);
router.get('/count', authenticateToken, employeeController.getEmployeeCount);
router.get("/average-salary", authenticateToken, employeeController.getAverageSalary);
 // No authentication middleware

module.exports = router;
