const pool = require("../utils/connect");

// Get all assets
exports.getAssets = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM assets");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve assets" });
  }
};

// Add a new asset
exports.addAsset = async (req, res) => {
  const { name, date_purchased, quantity, total_price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO assets (name, date_purchased, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, date_purchased, quantity, total_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add asset" });
  }
};

// Update an asset
exports.updateAsset = async (req, res) => {
  const { id } = req.params;
  const { name, date_purchased, quantity, total_price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE assets SET name = $1, date_purchased = $2, quantity = $3, total_price = $4 WHERE id = $5 RETURNING *",
      [name, date_purchased, quantity, total_price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update asset" });
  }
};

// Delete an asset
exports.deleteAsset = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM assets WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete asset" });
  }
};
