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
import Layout from "./components/Layout";

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
          <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployeePage /></ProtectedRoute>} />
          <Route path="/employee/:id" element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} /> 
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
