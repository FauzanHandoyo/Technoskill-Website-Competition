import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import "./AssetManagement.css"

export default function AssetManagement() {
  const [assets, setAssets] = useState([]);
  const [name, setName] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [editAssetId, setEditAssetId] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  // Fetch assets from the server
  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/assets");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Add or update an asset
  const handleSaveAsset = async () => {
    if (!name || !datePurchased || !quantity || !totalPrice) {
      alert("Please fill all fields.");
      return;
    }

    if (editAssetId) {
      // Edit existing asset
      try {
        const response = await axios.put(`http://localhost:8000/assets/${editAssetId}`, {
          name,
          date_purchased: datePurchased,
          quantity,
          total_price: totalPrice,
        });
        setAssets(assets.map(asset => asset.id === editAssetId ? response.data : asset));
        resetForm();
      } catch (error) {
        console.error("Error updating asset:", error);
      }
    } else {
      // Add new asset
      try {
        const response = await axios.post("http://localhost:8000/assets/add", {
          name,
          date_purchased: datePurchased,
          quantity,
          total_price: totalPrice,
        });
        setAssets([...assets, response.data]);
        resetForm();
      } catch (error) {
        console.error("Error adding asset:", error);
      }
    }
  };

  // Delete an asset
  const handleDeleteAsset = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await axios.delete(`http://localhost:8000/assets/${id}`);
        setAssets(assets.filter((asset) => asset.id !== id));
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  // Prepare form for editing an asset
  const handleEditAsset = (asset) => {
    setName(asset.name);
    setDatePurchased(asset.date_purchased);
    setQuantity(asset.quantity);
    setTotalPrice(asset.total_price);
    setEditAssetId(asset.id);
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setDatePurchased("");
    setQuantity("");
    setTotalPrice("");
    setEditAssetId(null);
  };

  return (
    <div className="app">
      <DashboardElement />
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Asset Management</h1>

        <div className="mb-4">
            <input
            type="text"
            placeholder="Asset Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field mr-2"
            />
            <input
            type="date"
            placeholder="Date Purchased"
            value={datePurchased}
            onChange={(e) => setDatePurchased(e.target.value)}
            className="input-field mr-2"
            />
            <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-field mr-2"
            />
            <input
            type="number"
            placeholder="Total Price"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="input-field mr-2"
            />
            <button onClick={handleSaveAsset} className="button bg-blue-500 text-white px-4 py-2 rounded">
            {editAssetId ? "Update Asset" : "Add Asset"}
            </button>
        </div>

        <ul className="list-none">
            {assets.map((asset) => (
            <li key={asset.id} className="mb-2">
                <div className="flex span-data justify-between items-center p-2 border rounded">
                <span>
                    {asset.name} - {asset.quantity} units, Total: ${asset.total_price}
                </span>
                <div>
                    <button
                    onClick={() => handleEditAsset(asset)}
                    className="button mr-2 bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="button bg-red-500 text-white px-3 py-1 rounded"
                    >
                    Delete
                    </button>
                </div>
                </div>
            </li>
            ))}
        </ul>
        </div>
    </div>
  );
}
