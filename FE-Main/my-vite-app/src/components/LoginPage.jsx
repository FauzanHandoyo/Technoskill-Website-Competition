import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/login", { name, password });
      if (response.status !== 200) throw new Error("Login failed");
      login(response.data.token);
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  const [hoveredButton, setHoveredButton] = useState(null);
  const handleHover = (buttonName) => setHoveredButton(buttonName);

  return (
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <p className="text-[30px] mx-auto mt-20">Login</p>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-20 space-y-4">
          <p
            className="text-white underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register?
          </p>

          <button
            className={`login-btn ${hoveredButton === "login-btn" ? "login-btn-hover" : ""} p-2 px-3 rounded-2xl`}
            onClick={handleLogin}
            onMouseOver={() => handleHover("login-btn")}
            onMouseLeave={() => handleHover(null)}
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}
