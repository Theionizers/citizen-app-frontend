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
import OfficerWelcome from "./pages/OfficerWelcome";

import AdminDashboard from "./pages/AdminDashboard";
import AdminWelcome from "./pages/AdminWelcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= HOME ================= */}
        {/* Public page - anyone can open the website */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ================= CITIZEN ================= */}

        <Route
          path="/submit-complaint"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        {/* ================= TRACK REQUEST ================= */}

        <Route
          path="/track"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        {/* ================= COMPLAINT DETAILS ================= */}

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute
              allowedRoles={[
                "citizen",
                "officer",
                "admin",
              ]}
            >
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* ================= OFFICER ================= */}

        <Route
          path="/officer-welcome"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <OfficerWelcome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["officer"]}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin-welcome"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminWelcome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;