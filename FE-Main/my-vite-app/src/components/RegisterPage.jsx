import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/manager/register", { name, password });
      if (response.status !== 201) throw new Error("Registration failed");
      login(response.data.token);
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <p className="text-[30px] mx-auto mt-20">Register</p>

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

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Confirm Password</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10 space-y-4 flex justify-center ">
          <p
            className="text-white underline cursor-pointer text-center"
            onClick={() => navigate("/login")}
          >
          Already have an account? Login
          </p>
        </div>
        
        <div className="mx-auto mt-3 flex">
          <button className="bg-[#6F90AF] p-2 px-3 rounded-full self-center " onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
