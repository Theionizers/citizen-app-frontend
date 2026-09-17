import { API_BASE_URL } from "./config";

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const testCitizenAccess = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/citizen-test`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Citizen access denied");
    }

    return data;
};

export const testOfficerAccess = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/officer-test`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Officer access denied");
    }

    return data;
};

export const testAdminAccess = async () => {
    const response = await fetch(`${API_BASE_URL}/rbac/admin-test`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Admin access denied");
    }

    return data;
};
