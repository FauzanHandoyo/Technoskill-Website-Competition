import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePasswordPage() {
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/manager/change-password",
        { name, currentPassword, newPassword }
      );
      if (response.status === 200) {
        alert("Password changed successfully. Please log in again.");
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password");
    }
  };

  return (
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <div className="bg-[#2B2E63] w-[622px] h-auto m-auto rounded-2xl flex flex-col text-white p-8">
        <p className="text-[30px] mx-auto mt-5">Change Password</p>

        <div className="mx-auto mt-5">
          <p className="text-[20px]">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-5">
          <p className="text-[20px]">Current Password</p>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-5">
          <p className="text-[20px]">New Password</p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-5">
          <p className="text-[20px]">Confirm New Password</p>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2 rounded-md"
          />
        </div>

        <div className="mx-auto mt-10">
          <button className="bg-[#6F90AF] p-2 px-3 rounded-2xl" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
