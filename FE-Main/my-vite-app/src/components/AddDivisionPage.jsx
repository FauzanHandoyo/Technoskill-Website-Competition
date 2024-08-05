import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import "./AddDivisionPage.css"

export default function AddDivisionPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAddDivision = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:8000/division/add",
        { name },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status !== 201) throw new Error("Add division failed");
      alert("Employee added successfully!");

      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Error adding division:", error);
      alert("Error adding division");
    }
  };

  return (
    <div className="app">
      <DashboardElement />
      <div className="main-content division-content">
        <div className="add-division-container">
          <p className="add-division-title">Add New Division</p>
          <div className="add-division-item">
            <p className="text-[20px] division-name">Division Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="add-division-actions">
            <button className="add-division-button" onClick={handleAddDivision}>Add Division</button>
          </div>
        </div>
      </div>
    </div>
  );
}
