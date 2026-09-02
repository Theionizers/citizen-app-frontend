import OfficerDashboard from "./pages/OfficerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SubmitComplaint from "./pages/SubmitComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
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
        <Route
          path="/officer-dashboard"
          element={<OfficerDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;