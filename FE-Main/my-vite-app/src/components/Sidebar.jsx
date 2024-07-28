//gajadi dipake pake yang elements dasbroard

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <Link to="/my-info" className="sidebar-item">
        <div>
          <img src="/path/to/my-info-icon.png" alt="My Info" />
          <span>My Info</span>
        </div>
      </Link>
      <Link to="/home" className="sidebar-item">
        <div>
          <img src="/path/to/home-icon.png" alt="Home" />
          <span>Home</span>
        </div>
      </Link>
      <Link to="/add-employee" className="sidebar-item">
        <div>
          <img src="/path/to/add-employee-icon.png" alt="Add Employee" />
          <span>Add Employee</span>
        </div>
      </Link>
      <div className="sidebar-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <div>
          <img src="/path/to/logout-icon.png" alt="Logout" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
