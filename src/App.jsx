import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";

import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* CITIZEN */}
        <Route
          path="/submit-complaint"
          element={<SubmitComplaint />}
        />

        <Route
          path="/my-complaints"
          element={<MyComplaints />}
        />

        <Route
          path="/complaint/:id"
          element={<ComplaintDetails />}
        />

        {/* OFFICER */}
        <Route
          path="/officer-dashboard"
          element={<OfficerDashboard />}
        />

        {/* ADMIN */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;