import React, { useState, useEffect } from "react";
import DashboardElement from "./elements/DashboardElement";
import RealTimeClock from "./elements/RealTimeClock";
import axios from "axios";
import "./DataCenterPage.css";

export default function DataCenterPage() {
  const [employeeCount, setEmployeeCount] = useState(1);
  const [averageSalary, setAverageSalary] = useState(null);

  // Function to fetch employee count
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get("http://localhost:8000/employee/count", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        setEmployeeCount(response.data.count);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    const fetchAverageSalary = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get("http://localhost:8000/employee/average-salary", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setAverageSalary(response.data.averageSalary);
      } catch (error) {
        console.error("Error fetching average salary:", error);
        setAverageSalary(null);
      }
    };

    fetchEmployeeCount();
    fetchAverageSalary();
  }, []);
  return (
    <div className="app">
      <DashboardElement />
      <div className="main-content">
        <div className="data-center-grid">
          <div className="data-column">
            <RealTimeClock />
          </div>
          <div className="data-column">
            <h2>Employee Statistics</h2>
            <p><strong>Number of Employees:</strong> {employeeCount}</p>

            <h2>Salary Statistics</h2>
            {averageSalary !== null ? (
            <p className="text-xl mt-2">
              The average salary is: ${Number(averageSalary).toFixed(2)}
            </p>
          ) : (
            <p>No salary data available</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
