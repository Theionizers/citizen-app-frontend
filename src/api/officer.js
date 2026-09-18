import { API_BASE_URL } from "./config";

const getToken = () => {
  return localStorage.getItem("access_token");
};

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

export const officerApi = {
  getComplaints: async () => {
    const response = await fetch(`${API_BASE_URL}/complaints/officer`, {
      method: "GET",
      headers: authHeaders(),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Failed to load officer complaints.");
    }

    return result;
  },

  getAssignedComplaints: async () => {
    const response = await fetch(
      `${API_BASE_URL}/complaints/officer/assigned`,
      {
        method: "GET",
        headers: authHeaders(),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.detail || "Failed to load assigned complaints."
      );
    }

    return result;
  },

  updateStatus: async (complaintId, status, officerNote = "") => {
    const response = await fetch(
      `${API_BASE_URL}/complaints/${complaintId}/status`,
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          status,
          ...(officerNote.trim()
            ? { officer_note: officerNote.trim() }
            : {}),
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.detail || "Failed to update complaint status."
      );
    }

    return result;
  },
};

export { API_BASE_URL };
