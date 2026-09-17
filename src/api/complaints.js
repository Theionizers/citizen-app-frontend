import { API_BASE_URL } from "./config";

const getToken = () => {
  return localStorage.getItem("access_token");
};

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

export const complaintApi = {
  // Create a complaint
  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.detail || "Failed to create complaint."
      );
    }

    return result;
  },

  // Get complaints of logged-in citizen
  getMyComplaints: async () => {
    const response = await fetch(`${API_BASE_URL}/complaints/my`, {
      method: "GET",
      headers: authHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.detail || "Failed to load complaints."
      );
    }

    return result;
  },

  // Get a single complaint
  // Backend currently does not provide a citizen-specific
  // GET /complaints/{id} endpoint.
  getById: async (id) => {
  const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: "GET",
    headers: authHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to load complaint.");
  }

  return result;
},
};

export { API_BASE_URL, getToken, authHeaders };
