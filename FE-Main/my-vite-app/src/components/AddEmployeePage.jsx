import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import './AddEmployeePage.css';

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [bornPlace, setBornPlace] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [joinDate, setJoinDate] = useState("");

  const navigate = useNavigate();

  const handleAddEmployee = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
      const response = await axios.post("http://localhost:8000/employee/add", {
        name,
        division,
        salary,
        born_place: bornPlace,
        born_date: bornDate,
        join_date: joinDate,
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Add the token to the request headers
        }
      });

      if (response.status !== 201) throw new Error("Add employee failed");

      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <DashboardElement />

      <div className="main-content">
        <div className="add-employee-container">
          <p className="add-employee-title">Add New Employee</p>

          <div className="add-employee-item">
            <p className="text-[20px]">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="add-employee-item">
            <p className="text-[20px]">Division</p>
            <input
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="add-employee-item">
            <p className="text-[20px]">Salary</p>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="add-employee-item">
            <p className="text-[20px]">Born Place</p>
            <input
              value={bornPlace}
              onChange={(e) => setBornPlace(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="add-employee-item">
            <p className="text-[20px]">Born Date</p>
            <input
              type="date"
              value={bornDate}
              onChange={(e) => setBornDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="add-employee-item">
            <p className="text-[20px]">Join Date</p>
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="add-employee-actions">
            <button className="add-employee-button" onClick={handleAddEmployee}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
