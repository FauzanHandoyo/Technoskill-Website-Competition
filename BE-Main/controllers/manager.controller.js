const pool = require("../utils/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'your_jwt_secret_key';

exports.registerManager = async function registerManager(req, res) {
  const { name, email, division, join_date, password } = req.body;

  try {
    // Check if the manager already exists by name
    const existingManager = await pool.query("SELECT * FROM managers WHERE name = $1", [name]);
    if (existingManager.rows.length > 0) {
      return res.status(400).json({ error: "Manager already exists" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new manager with optional fields
    const newManager = await pool.query(
      "INSERT INTO managers (name, email, division, join_date, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, division, join_date, hashedPassword]
    );

    // Generate a JWT token for the new manager
    const token = jwt.sign({ id: newManager.rows[0].id, name: newManager.rows[0].name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering manager:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginManager = async function loginManager(req, res) {
  const { name, password } = req.body;

  try {
    // Find the manager by name
    const manager = await pool.query("SELECT * FROM managers WHERE name = $1", [name]);
    if (manager.rows.length === 0) {
      return res.status(400).json({ error: "Manager not found" });
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, manager.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate a JWT token for the manager
    const token = jwt.sign({ id: manager.rows[0].id, name: manager.rows[0].name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in manager:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async function changePassword(req, res) {
  const { name, currentPassword, newPassword } = req.body;

  try {
    const manager = await pool.query("SELECT * FROM managers WHERE name = $1", [name]);
    if (manager.rows.length === 0) {
      return res.status(404).json({ error: "Manager not found" });
    }

    const validPassword = await bcrypt.compare(currentPassword, manager.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE managers SET password = $1 WHERE name = $2", [hashedPassword, name]);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: error.message });
  }
};