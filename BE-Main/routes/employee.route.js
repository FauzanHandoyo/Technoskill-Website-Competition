const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

// Route to add a new employee
router.post("/add", employeeController.addEmployee);

// Route to get all employees
router.get("/", employeeController.getEmployee);

// Route to get a single employee by ID
router.get("/:id", employeeController.getOneEmployee);

// Add more routes as needed

module.exports = router;
