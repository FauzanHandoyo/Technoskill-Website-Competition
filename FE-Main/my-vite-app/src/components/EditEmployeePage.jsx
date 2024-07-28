import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";

export default function EditEmployeePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");

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
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <DashboardElement />

      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <p className="text-[30px] mx-auto mt-20">Edit Employee</p>

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
          <button className="bg-[#6F90AF] p-2 px-3 rounded-2xl" onClick={handleEditEmployee}>Update</button>
        </div>
      </div>
    </div>
  );
}
