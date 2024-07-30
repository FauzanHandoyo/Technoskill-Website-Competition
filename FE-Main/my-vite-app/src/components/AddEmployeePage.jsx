import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const handleAddEmployee = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to add an employee.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/employee/add', {
        name,
        division,
        salary,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status !== 201) throw new Error("Add employee failed");

      console.log(response.data);

      // Optionally, reset the form or display a success message
      setName("");
      setDivision("");
      setSalary("");
      alert("Employee added successfully!");

      // Redirect to home page to see the updated list of employees
      navigate('/home');

    } catch (error) {
      console.error(error);
      alert("Failed to add employee");
    }
  };

  const [hoveredButton, setHoveredButton] = useState(null);
  const handleHover = (buttonName) => setHoveredButton(buttonName);
  
  return (
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <DashboardElement />

      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <p className="text-[30px] mx-auto mt-20">Add New Employee</p>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Division</p>
          <input
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Salary</p>
          <input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-20">
        <button
            className={`add-employee-btn ${hoveredButton === "add-employee-btn" ? "add-employee-btn-hover" : ""} p-2 px-3 rounded-2xl`}
            onClick={handleAddEmployee}
            onMouseOver={() => handleHover("add-employee-btn")}
            onMouseLeave={() => handleHover(null)}
        >
            Add</button>
        </div>
      </div>
    </div>
  );
}
