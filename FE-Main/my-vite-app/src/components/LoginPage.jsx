import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token used for fetchEmployees:", token); // Log the token
      const response = await axios.get("http://localhost:8000/employee", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchEmployeeCount = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token used for fetchEmployeeCount:", token); // Log the token
      const response = await axios.get("http://localhost:8000/employee/count", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("Employee count response:", response); // Log the response
      setEmployeeCount(response.data.count);
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
      fetchEmployeeCount();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-[#CED1DA] flex">
      <DashboardElement />

      <div className="bg-[#798DC5] w-[1400px] h-[841px] m-auto rounded-2xl flex-1">
        <div className="p-4">
          <h2 className="text-white text-[24px]">Dashboard</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-black text-[20px]">Number of Employees: {employeeCount}</h3>
          </div>
        </div>
        <ol className="overflow-auto w-full">
          {data.map((employee, index) => (
            <li
              key={index}
              className="text-white text-[20px] p-3 flex flex-col bg-[#737CCF] m-2 rounded-2xl"
            >
              <p>{employee.name}</p>
              <p>{employee.division}</p>
              <button
                className="bg-blue-500 text-white p-2 rounded mb-2"
                onClick={() => navigate(`/employee/${employee.id}`)}
              >
                View More
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
