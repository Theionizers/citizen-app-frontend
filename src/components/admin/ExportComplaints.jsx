import { API_BASE_URL } from "../../api/config";

const getToken = () => {
    return localStorage.getItem("access_token");
};

export default function ExportComplaints() {
    const handleExport = async () => {
        try {
            const token = getToken();

            if (!token) {
                alert("Please login again.");
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/complaints/admin/export`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                let message = "Failed to export complaints.";

                try {
                    const data = await response.json();
                    message = data.detail || message;
                } catch {
                    // Keep default message
                }

                throw new Error(message);
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "complaints.xlsx";

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export failed:", error);
            alert(error.message || "Failed to export complaints.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleExport}
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-700"
        >
            ↓ Export to Excel
        </button>
    );
}