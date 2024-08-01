const pool = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  try {
    const { name, division, salary, born_place, born_date, join_date } = req.body;
    const response = await pool.query(
      "INSERT INTO employee (name, division, salary, born_place, born_date, join_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, division, salary, born_place, born_date, join_date]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getEmployee = async function getEmployee(req, res) {
  try {
    const response = await pool.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneEmployee = async function getOneEmployee(req, res) {
  try {
    const { id } = req.params;
    const response = await pool.query("SELECT * FROM employee WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateEmployee = async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { name, division, salary, born_place, born_date, join_date } = req.body;
    const response = await pool.query(
      "UPDATE employee SET name = $1, division = $2, salary = $3, born_place = $4, born_date = $5, join_date = $6 WHERE id = $7 RETURNING *",
      [name, division, salary, born_place, born_date, join_date, id]
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteEmployee = async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const response = await pool.query("DELETE FROM employee WHERE id = $1 RETURNING *", [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getEmployeeCount = async function getEmployeeCount(req, res) {
  try {
    console.log("Reached getEmployeeCount endpoint"); // Log to verify endpoint is reached
    const response = await pool.query("SELECT COUNT(*) FROM employee");
    console.log("Count query response:", response.rows[0].count); // Log the response
    res.status(200).json({ count: response.rows[0].count });
  } catch (error) {
    console.error("Error in getEmployeeCount:", error); // Log any errors
    res.status(500).json({ error: error.message });
  }
};
