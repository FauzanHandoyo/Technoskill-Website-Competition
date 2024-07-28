import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";

export default function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/employee/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="bg-[#CED1DA] flex">
      <DashboardElement />

      <div className="bg-[#798DC5] w-[1400px] h-[841px] m-auto rounded-2xl flex-1">
        <ol className="overflow-auto w-full">
          {data.map((employee, index) => (
            <li
              key={index}
              className="text-white text-[20px] p-3 flex flex-col bg-[#737CCF] m-2 rounded-2xl"
            >
              <p>{employee.name}</p>
              <p>{employee.division}</p>
              <p>{employee.salary}</p>
              <button
                className="bg-blue-500 text-white p-2 rounded mb-2"
                onClick={() => navigate(`/edit-employee/${employee.id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDelete(employee.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
