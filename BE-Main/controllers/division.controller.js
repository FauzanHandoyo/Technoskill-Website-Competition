const pool = require("../utils/connect");

exports.addDivision = async function addDivision(req, res) {
  try {
    const { name } = req.body;
    const response = await pool.query(
      "INSERT INTO divisions (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error("Error adding division:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getDivisions = async function getDivisions(req, res) {
    try {
      const response = await pool.query("SELECT * FROM divisions");
      res.status(200).json(response.rows);
    } catch (error) {
      console.error("Error fetching divisions:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
