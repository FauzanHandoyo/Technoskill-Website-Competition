const pool = require("../utils/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = 'your_jwt_secret_key';

exports.registerManager = async function registerManager(req, res) {
  const { name, password } = req.body;

  try {
    const existingManager = await pool.query("SELECT * FROM managers WHERE name = $1", [name]);
    if (existingManager.rows.length > 0) {
      return res.status(400).json({ error: "Manager already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newManager = await pool.query(
      "INSERT INTO managers (name, password) VALUES ($1, $2) RETURNING *",
      [name, hashedPassword]
    );

    const token = jwt.sign({ id: newManager.rows[0].id, name: newManager.rows[0].name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginManager = async function loginManager(req, res) {
  const { name, password } = req.body;

  try {
    const manager = await pool.query("SELECT * FROM managers WHERE name = $1", [name]);
    if (manager.rows.length === 0) {
      return res.status(400).json({ error: "Manager not found" });
    }

    const validPassword = await bcrypt.compare(password, manager.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: manager.rows[0].id, name: manager.rows[0].name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
