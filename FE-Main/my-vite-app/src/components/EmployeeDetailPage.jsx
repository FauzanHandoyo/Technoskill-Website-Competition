import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DashboardElement from "./elements/DashboardElement";
import './EmployeeDetailPage.css';

export default function EmployeeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
  
    useEffect(() => {
      const fetchEmployee = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/employee/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setEmployee(response.data);
        } catch (error) {
          console.error("Error fetching employee:", error);
        }
      };
  
      fetchEmployee();
    }, [id]);
  
    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/employee/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        navigate('/home');
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };
  
    if (!employee) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="app">
        <DashboardElement />
  
        <div className="main-content">
          <div className="detail-container">
            <p className="detail-title">Employee Details</p>
  
            <div className="detail-item">
              <p>Name: {employee.name}</p>
            </div>
  
            <div className="detail-item">
              <p>Division: {employee.division}</p>
            </div>
  
            <div className="detail-item">
              <p>Salary: {employee.salary}</p>
            </div>
  
            <div className="detail-item">
              <p>Born Place: {employee.born_place}</p>
            </div>
  
            <div className="detail-item">
              <p>Born Date: {new Date(employee.born_date).toLocaleDateString()}</p>
            </div>
  
            <div className="detail-item">
              <p>Join Date: {new Date(employee.join_date).getFullYear()}</p>
            </div>
  
            <div className="detail-actions">
              <button
                className="button button-edit"
                onClick={() => navigate(`/edit-employee/${employee.id}`)}
              >
                Edit
              </button>
              <button
                className="button button-delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }