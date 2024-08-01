import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import './EditEmployeePage.css';

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [bornPlace, setBornPlace] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [joinDate, setJoinDate] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/employee/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const employee = response.data;
        setName(employee.name);
        setDivision(employee.division);
        setSalary(employee.salary);
        setBornPlace(employee.born_place);
        setBornDate(employee.born_date);
        setJoinDate(employee.join_date);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEditEmployee = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/employee/${id}`, {
        name,
        division,
        salary,
        born_place: bornPlace,
        born_date: bornDate,
        join_date: joinDate,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/home');
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="app">
      <DashboardElement />

      <div className="main-content">
        <div className="edit-employee-container">
          <p className="edit-employee-title">Edit Employee</p>

          <div className="edit-employee-item">
            <p className="text-[20px]">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="edit-employee-item">
            <p className="text-[20px]">Division</p>
            <input
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="edit-employee-item">
            <p className="text-[20px]">Salary</p>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="edit-employee-item">
            <p className="text-[20px]">Born Place</p>
            <input
              value={bornPlace}
              onChange={(e) => setBornPlace(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="edit-employee-item">
            <p className="text-[20px]">Born Date</p>
            <input
              type="date"
              value={bornDate}
              onChange={(e) => setBornDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="edit-employee-item">
            <p className="text-[20px]">Join Date</p>
            <input
              type="date"
              value={joinDate}
              onChange={(e) => setJoinDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="edit-employee-actions">
            <button className="edit-employee-button" onClick={handleEditEmployee}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
