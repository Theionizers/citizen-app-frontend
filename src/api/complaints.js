const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const getToken = () => {
  return localStorage.getItem("access_token");
};

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const complaintApi = {
  // Create a complaint
  create: async (data) => {
    // Backend endpoint/request format will be connected
    // after receiving the latest complaint API contract.
    throw new Error("Complaint API contract pending");
  },

  // Get complaints of logged-in citizen
  getMyComplaints: async () => {
    throw new Error("Complaint API contract pending");
  },

  // Get a single complaint
  getById: async (id) => {
    throw new Error("Complaint API contract pending");
  },
};

export { API_BASE_URL, getToken, authHeaders };