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
        className={`fixed top-0 left-0 bg-[#2B2E63] h-full w-[300px] flex flex-col pt-8 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          onMouseOver={() => handleHover("my-info")}
          onMouseLeave={() => handleHover(null)}
          className={`my-info ${
            hoveredButton === "my-info" ? "my-info-hover" : ""
          } w-[280px] rounded-r-lg flex items-center pl-8 pb-4 cursor-pointer hover:bg-[#191a39]`}
          onClick={() => navigate("/my-info")}
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-10 stroke-white " >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          <p className="my-auto text-white ml-5 text-[20px]">My Info</p>
        </div>

        <hr class="h-1 my-2 bg-white dark:bg-gray-700"></hr>

        <div
          onMouseOver={() => handleHover("home")}
          onMouseLeave={() => handleHover(null)}
          className={`home ${
            hoveredButton === "home" ? "home-hover" : ""
          } w-[280px] rounded-r-lg flex items-center pl-8 py-4 cursor-pointer hover:bg-[#191a39]`}
          onClick={() => navigate("/home")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="size-10 stroke-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

          <p className="my-auto text-white ml-5 text-[20px]">Home</p>
        </div>

        <div
          onMouseOver={() => handleHover("add-employee")}
          onMouseLeave={() => handleHover(null)}
          className={`add-employee ${
            hoveredButton === "add-employee" ? "add-employee-hover" : ""
          } w-[280px] rounded-r-lg flex items-center pl-8 py-4 cursor-pointer hover:bg-[#191a39]`}
          onClick={() => navigate("/add-employee")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-10 stroke-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>

          <p className="my-auto text-white ml-5 text-[20px]">Add Employee</p>
        </div>

        <div
          onMouseOver={() => handleHover("edit-employee")}
          onMouseLeave={() => handleHover(null)}
          className={`edit-employee ${
            hoveredButton === "edit-employee" ? "edit-employee-hover" : ""
          } w-[280px] rounded-r-lg flex items-center pl-8 py-4 cursor-pointer hover:bg-[#191a39]`}
          onClick={() => navigate("/edit-employee")}
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="size-10 stroke-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>


          <p className="my-auto text-white ml-5 text-[20px]">Edit Employee List</p>
        </div>

        <div
          onMouseOver={() => handleHover("login")}
          onMouseLeave={() => handleHover(null)}
          className={`login ${
            hoveredButton === "login" ? "login-hover" : ""
          } w-[280px] rounded-r-lg flex items-center pl-8 py-4 cursor-pointer hover:bg-[#191a39]`}
          onClick={() => navigate("/login")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  class="size-10 stroke-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>

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
          isSidebarOpen ? "translate-x-[300px]" : "translate-x-0"
        }`}
      >
        ☰
      </button>
    </div>
  );
}
