import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import homeIcon from "../../assets/database-info.svg";
import addEmployeeIcon from "../../assets/person-add-svgrepo-com.svg";
import myInfoIcon from "../../assets/user-circle-svgrepo-com.svg";
import loginIcon from "../../assets/login-2-svgrepo-com.svg";
import logoutIcon from "../../assets/logout-2-svgrepo-com.svg"; // Add a logout icon
import divisionIcon from "../../assets/add-circle-svgrepo-com.svg";
import dataIcon from "../../assets/home-4-svgrepo-com.svg"; // Ensure you have an appropriate icon for Data Center
import assetIcon from "../../assets/box2.svg"

export default function DashboardElement() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [hoveredButton, setHoveredButton] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleHover = (buttonName) => setHoveredButton(buttonName);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-[#2B2E63] h-full w-[250px] flex flex-col py-8 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          onMouseOver={() => handleHover("my-info")}
          onMouseLeave={() => handleHover(null)}
          className={`my-info ${
            hoveredButton === "my-info" ? "my-info-hover" : ""
          } flex items-center ml-5 py-3 px-5 cursor-pointer`}
          onClick={() => navigate("/my-info")}
        >
          <img src={myInfoIcon} alt="My Info" className="menu-icon w-8 h-8" />
          <p className="my-auto text-white ml-5 text-[20px]">My Info</p>
        </div>

        <div
          onMouseOver={() => handleHover("home")}
          onMouseLeave={() => handleHover(null)}
          className={`home ${
            hoveredButton === "home" ? "home-hover" : ""
          } flex items-center ml-5 py-3 px-5 cursor-pointer`}
          onClick={() => navigate("/home")}
        >
          <img src={homeIcon} alt="Home" className="menu-icon w-8 h-8" />
          <p className="my-auto text-white ml-5 text-[20px]">Employees Data</p>
        </div>

        <div
          onMouseOver={() => handleHover("add-employee")}
          onMouseLeave={() => handleHover(null)}
          className={`add-employee ${
            hoveredButton === "add-employee" ? "add-employee-hover" : ""
          } flex items-center ml-5 py-3 px-5 cursor-pointer`}
          onClick={() => navigate("/add-employee")}
        >
          <img src={addEmployeeIcon} alt="Add Employee" className="menu-icon w-8 h-8" />
          <p className="my-auto text-white ml-5 text-[20px]">Add Employee</p>
        </div>

        <div
                onMouseOver={() => handleHover("assets")}
                onMouseLeave={() => handleHover(null)}
                className={`assets ${
                  hoveredButton === "assets" ? "assets-hover" : ""
                } flex items-center ml-5 py-3 px-5 cursor-pointer`}
                onClick={() => navigate("/asset-management")}
              >
          <img src= {assetIcon} alt="Assets" className="menu-icon w-8 h-8" /> {/* Use an appropriate icon */}
          <p className="my-auto text-white ml-5 text-[20px]">Assets</p>
        </div>

        <div
          onMouseOver={() => handleHover("data-center")}
          onMouseLeave={() => handleHover(null)}
          className={`data-center ${
            hoveredButton === "data-center" ? "data-center-hover" : ""
          } flex items-center ml-5 py-3 px-5 cursor-pointer`}
          onClick={() => navigate("/data-center")}
        >
          <img src={dataIcon} alt="Data Center" className="menu-icon w-8 h-8" />
          <p className="my-auto text-white ml-5 text-[20px]">Dashboard</p>
        </div>

        <div
          onMouseOver={() => handleHover("add-division")}
          onMouseLeave={() => handleHover(null)}
          className={`add-division ${
            hoveredButton === "add-division" ? "add-division-hover" : ""
          } flex items-center ml-5 py-3 px-5 cursor-pointer`}
          onClick={() => navigate("/add-division")}
        >
          <img src={divisionIcon} alt="Add Division" className= "w-8 h-8 menu-icon" />
          <p className="my-auto text-white ml-5 text-[20px]">Add Division</p>
        </div>

        {isAuthenticated ? (
          <div
            onMouseOver={() => handleHover("logout")}
            onMouseLeave={() => handleHover(null)}
            className={`logout ${
              hoveredButton === "logout" ? "logout-hover" : ""
            } flex items-center ml-5 py-3 px-5 cursor-pointer`}
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="Logout" className="menu-icon w-8 h-8" />
            <p className="my-auto text-white ml-5 text-[20px]">Logout</p>
          </div>
        ) : (
          <div
            onMouseOver={() => handleHover("login")}
            onMouseLeave={() => handleHover(null)}
            className={`login ${
              hoveredButton === "login" ? "login-hover" : ""
            } flex items-center ml-5 py-3 px-5 cursor-pointer`}
            onClick={() => navigate("/login")}
          >
            <img src={loginIcon} alt="Login" className="menu-icon w-8 h-8" />
            <p className="my-auto text-white ml-5 text-[20px]">Login</p>
          </div>
        )}
      </div>

      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        onMouseOver={() => handleHover("sidebar-button")}
        onMouseLeave={() => handleHover(null)}
        className={`nav-section ${
          hoveredButton === "sidebar-button" ? "btn-hover" : ""
        } fixed top-0 left-0 mt-0 ml-0 p-2 bg-blue-500 text-white rounded focus:outline-none transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-[250px]" : "translate-x-0"
        }`}
      >
        ☰
      </button>
    </div>
  );
}
