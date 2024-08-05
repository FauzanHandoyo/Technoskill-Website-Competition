import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import "./EditEmployeePage.css"; // Make sure to import your CSS file

export default function EditEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [bornPlace, setBornPlace] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [divisions, setDivisions] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8000/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

    const fetchDivisions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/division", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDivisions(response.data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchEmployee();
    fetchDivisions();
  }, [id]);

  const handleUpdateEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/employee/${id}`,
        {
          name,
          division,
          salary,
          born_place: bornPlace,
          born_date: bornDate,
          join_date: joinDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) throw new Error("Update employee failed");

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
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="select-dropdown"
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.name}>
                  {div.name}
                </option>
              ))}
            </select>
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
            <button
              className="edit-employee-button"
              onClick={handleUpdateEmployee}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
