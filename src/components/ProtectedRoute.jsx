import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          localStorage.removeItem("access_token");
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return null;
  }

  if (!localStorage.getItem("access_token")) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (user?.role === "officer") {
      return <Navigate to="/officer-dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
