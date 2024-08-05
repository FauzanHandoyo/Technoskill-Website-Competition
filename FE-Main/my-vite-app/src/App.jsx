import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import AddEmployeePage from "./components/AddEmployeePage";
import MyInfoPage from "./components/MyInfoPage";
import EditEmployeePage from "./components/EditEmployeePage";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeDetailPage from "./components/EmployeeDetailPage";
import AddDivisionPage from "./components/AddDivisionPage";
import DataCenterPage from "./components/DataCenterPage"; 
import ChangePasswordPage from "./components/ChangePasswordPage";
import Layout from "./components/Layout";
import AssetManagement from "./components/AssetManagement";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
          <Route path="/add-employee" element={<ProtectedRoute><Layout><AddEmployeePage /></Layout></ProtectedRoute>} />
          <Route path="/my-info" element={<ProtectedRoute><Layout><MyInfoPage /></Layout></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><Layout><EditEmployeePage /></Layout></ProtectedRoute>} />
          <Route path="/employee/:id" element={<ProtectedRoute><Layout><EmployeeDetailPage /></Layout></ProtectedRoute>} /> 
          <Route path="/add-division" element={<ProtectedRoute><Layout><AddDivisionPage /></Layout></ProtectedRoute>} />
          <Route path="/data-center" element={<ProtectedRoute><Layout><DataCenterPage /></Layout></ProtectedRoute>} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/asset-management" element={<ProtectedRoute><Layout><AssetManagement /></Layout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
