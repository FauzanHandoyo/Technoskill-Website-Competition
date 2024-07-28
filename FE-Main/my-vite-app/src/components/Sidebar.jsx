import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
      <Link to="/login" className="sidebar-item">
        <div>
          <img src="/path/to/login-icon.png" alt="Login" />
          <span>Login</span>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
