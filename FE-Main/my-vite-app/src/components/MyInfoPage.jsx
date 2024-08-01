import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import './MyInfoPage.css';

export default function MyInfoPage() {
  const [manager, setManager] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:8000/manager/me", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setManager(response.data);
      } catch (error) {
        console.error("Error fetching manager data:", error);
      }
    };

    fetchManager();
  }, []);

  return (
    <div className="app">
      <DashboardElement />

      <div className="main-content">
        <div className="my-info-container">
          <p className="my-info-title">My Info</p>

          <div className="my-info-item">
            <p className="text-[20px]">Name</p>
            <input
              value={manager.name || ""}
              readOnly
              className="input-field"
            />
          </div>

          <div className="my-info-item">
            <p className="text-[20px]">Email</p>
            <input
              value={manager.email || ""}
              readOnly
              className="input-field"
            />
          </div>

          <div className="my-info-item">
            <p className="text-[20px]">Division</p>
            <input
              value={manager.division || ""}
              readOnly
              className="input-field"
            />
          </div>

          <div className="my-info-item">
            <p className="text-[20px]">Join Date</p>
            <input
              value={new Date(manager.join_date).toLocaleDateString() || ""}
              readOnly
              className="input-field"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
