import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../../assets/home.svg";
import addEmployeeIcon from "../../assets/addPerson.svg";
import myInfoIcon from "../../assets/person.svg";
import loginIcon from "../../assets/login.svg";

export default function DashboardElement() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [hoveredButton, setHoveredButton] = useState(null);

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
          } flex items-center ml-5 cursor-pointer`}
          onClick={() => navigate("/my-info")}
        >
          <img src={myInfoIcon} alt="My Info" />
          <p className="my-auto text-white ml-5 text-[20px]">My Info</p>
        </div>

        <div
          onMouseOver={() => handleHover("home")}
          onMouseLeave={() => handleHover(null)}
          className={`home ${
            hoveredButton === "home" ? "home-hover" : ""
          } flex items-center ml-5 cursor-pointer`}
          onClick={() => navigate("/home")}
        >
          <img src={homeIcon} alt="Home" />
          <p className="my-auto text-white ml-5 text-[20px]">Home</p>
        </div>

        <div
          onMouseOver={() => handleHover("add-employee")}
          onMouseLeave={() => handleHover(null)}
          className={`add-employee ${
            hoveredButton === "add-employee" ? "add-employee-hover" : ""
          } flex items-center ml-5 cursor-pointer`}
          onClick={() => navigate("/add-employee")}
        >
          <img src={addEmployeeIcon} alt="Add Employee" />
          <p className="my-auto text-white ml-5 text-[20px]">Add Employee</p>
        </div>

        <div
          onMouseOver={() => handleHover("login")}
          onMouseLeave={() => handleHover(null)}
          className={`login ${
            hoveredButton === "login" ? "login-hover" : ""
          } flex items-center ml-5 cursor-pointer`}
          onClick={() => navigate("/login")}
        >
          <img src={loginIcon} alt="Login" />
          <p className="my-auto text-white ml-5 text-[20px]">Login</p>
        </div>
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
