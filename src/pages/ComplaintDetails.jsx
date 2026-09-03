import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { complaintApi } from "../api/complaints";
import { officerApi } from "../api/officer";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

const normalizeStatus = (status = "") =>
  status.toLowerCase().replaceAll("_", " ").trim();

const formatStatus = (status) => {
  if (!status) return "Submitted";

  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getProgressStep = (status) => {
  const normalized = normalizeStatus(status);

  if (normalized === "resolved") {
    return 3;
  }

  if (
    normalized === "under review" ||
    normalized === "in progress" ||
    normalized === "processing"
  ) {
    return 2;
  }

  return 1;
};

const getStatusStyle = (status) => {
  const normalized = normalizeStatus(status);

  if (normalized === "resolved") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (
    normalized === "under review" ||
    normalized === "in progress" ||
    normalized === "processing"
  ) {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Complaint passed from Officer Dashboard
  const passedComplaint = location.state?.complaint;
  const fromOfficerDashboard =
    location.state?.fromOfficerDashboard === true;

  const [complaint, setComplaint] = useState(
    passedComplaint || null
  );

  const [userRole, setUserRole] = useState(null);

  const [loading, setLoading] = useState(!passedComplaint);
  const [error, setError] = useState("");

  const [selectedStatus, setSelectedStatus] = useState(
    passedComplaint?.status || ""
  );

  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState("");

  /*
    Get current logged-in user's role.
  */
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Please login to continue.");
      setLoading(false);
      return;
    }

    const loadUser = async () => {
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
          setError("Unable to verify user.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUserRole(data.role);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        setError("Unable to verify user.");
      }
    };

    loadUser();
  }, []);

  /*
    Load complaint.

    Officer:
    Use complaint already fetched by
    GET /complaints/officer/assigned.

    Citizen:
    Use existing GET /complaints/{id}.
  */
  useEffect(() => {
    const loadComplaint = async () => {
      try {
        setError("");

        /*
          If Officer Dashboard already passed the complaint,
          there is no need to call /complaints/{id}.
        */
        if (fromOfficerDashboard && passedComplaint) {
          setComplaint(passedComplaint);
          setSelectedStatus(passedComplaint.status || "");
          setLoading(false);
          return;
        }

        /*
          For direct officer access/refresh:
          fetch assigned complaints and find the requested one.
        */
        if (userRole === "officer") {
          const assignedComplaints =
            await officerApi.getAssignedComplaints();

          const foundComplaint = assignedComplaints.find(
            (item) => String(item.id) === String(id)
          );

          if (!foundComplaint) {
            throw new Error(
              "This complaint is not assigned to your officer account."
            );
          }

          setComplaint(foundComplaint);
          setSelectedStatus(foundComplaint.status || "");
          setLoading(false);
          return;
        }

        /*
          Citizen flow.
        */
        if (userRole === "citizen") {
          const data = await complaintApi.getById(id);

          setComplaint(data);
          setSelectedStatus(data.status || "");
          setLoading(false);
          return;
        }

        /*
          Wait until role is available.
        */
      } catch (err) {
        console.error("Failed to load complaint:", err);
        setError(
          err.message || "Unable to load complaint details."
        );
        setLoading(false);
      }
    };

    /*
      If complaint was passed from dashboard,
      no API call is required.
    */
    if (fromOfficerDashboard && passedComplaint) {
      setComplaint(passedComplaint);
      setSelectedStatus(passedComplaint.status || "");
      setLoading(false);
      return;
    }

    /*
      Wait for user role before deciding which API to use.
    */
    if (userRole) {
      loadComplaint();
    }
  }, [
    id,
    userRole,
    passedComplaint,
    fromOfficerDashboard,
  ]);

  /*
    Update complaint status.
  */
  const handleStatusUpdate = async () => {
    if (!complaint || !selectedStatus) {
      return;
    }

    const currentStatus = normalizeStatus(
      complaint.status
    );

    const newStatus = normalizeStatus(selectedStatus);

    if (currentStatus === newStatus) {
      setStatusError(
        "Please select a different status."
      );
      setStatusMessage("");
      return;
    }

    try {
      setUpdatingStatus(true);
      setStatusError("");
      setStatusMessage("");

      const updatedComplaint =
        await officerApi.updateStatus(
          complaint.id,
          selectedStatus
        );

      setComplaint(updatedComplaint);

      setSelectedStatus(
        updatedComplaint.status || selectedStatus
      );

      setStatusMessage(
        "Complaint status updated successfully."
      );
    } catch (err) {
      console.error(
        "Failed to update complaint status:",
        err
      );

      setStatusError(
        err.message ||
          "Failed to update complaint status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  /*
    Loading
  */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F1]">
        <Navbar />

        <main className="px-5 pb-16 pt-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                Loading complaint details...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /*
    Error
  */
  if (error || !complaint) {
    return (
      <div className="min-h-screen bg-[#FFF8F1]">
        <Navbar />

        <main className="px-5 pb-16 pt-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">

            <button
              type="button"
              onClick={() =>
                navigate(
                  userRole === "officer"
                    ? "/officer-dashboard"
                    : "/my-complaints"
                )
              }
              className="mb-6 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
            >
              ←{" "}
              {userRole === "officer"
                ? "Back to Dashboard"
                : "Back to My Requests"}
            </button>

            <div className="rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
              <h1 className="text-xl font-bold text-slate-900">
                Complaint details not available
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {error ||
                  "Unable to load complaint details."}
              </p>
            </div>

          </div>
        </main>
      </div>
    );
  }

  const progressStep = getProgressStep(
    complaint.status
  );

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="px-5 pb-16 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl">

          {/* Back */}
          <button
            type="button"
            onClick={() =>
              navigate(
                userRole === "officer"
                  ? "/officer-dashboard"
                  : "/my-complaints"
              )
            }
            className="mb-6 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
          >
            ←{" "}
            {userRole === "officer"
              ? "Back to Dashboard"
              : "Back to My Requests"}
          </button>

          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-orange-600">
              {userRole === "officer"
                ? "OFFICER PORTAL"
                : "CITIZEN SERVICES"}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>

                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-orange-600">
                    OZO-{complaint.id}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {formatStatus(complaint.status)}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  Complaint Details
                </h1>

                <p className="mt-3 text-slate-600">
                  {userRole === "officer"
                    ? "Review complaint information and update its current status."
                    : "Track the status and details of your submitted request."}
                </p>

              </div>

              <p className="text-sm text-slate-500">
                {formatDate(complaint.created_at)}
              </p>

            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-[0_6px_24px_rgba(90,60,30,0.04)] sm:p-8">

            {/* Complaint */}
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500">
                COMPLAINT
              </p>

              <p className="text-base leading-7 text-slate-800 sm:text-lg">
                {complaint.description ||
                  "No complaint description available."}
              </p>
            </div>

            {/* Information */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Department */}
              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4">
                <p className="mb-1 text-xs text-slate-500">
                  Department
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.department_id
                    ? `Department #${complaint.department_id}`
                    : "Not assigned"}
                </p>
              </div>

              {/* Service */}
              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4">
                <p className="mb-1 text-xs text-slate-500">
                  Service
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.service_id
                    ? `Service #${complaint.service_id}`
                    : "Not assigned"}
                </p>
              </div>

              {/* Expected Resolution */}
              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4 sm:col-span-2">
                <p className="mb-1 text-xs text-slate-500">
                  Expected Resolution
                </p>

                <p className="text-sm font-semibold leading-6 text-slate-800">
                  {complaint.expected_resolution ||
                    "Not available"}
                </p>
              </div>

              {/* Routing Confidence */}
              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4">
                <p className="mb-1 text-xs text-slate-500">
                  Routing Confidence
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.routing_confidence != null
                    ? `${Math.round(
                        complaint.routing_confidence * 100
                      )}%`
                    : "—"}
                </p>
              </div>

              {/* Assigned Officer */}
              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4">
                <p className="mb-1 text-xs text-slate-500">
                  Assigned Officer
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.assigned_officer_id
                    ? `Officer #${complaint.assigned_officer_id}`
                    : "Not assigned"}
                </p>
              </div>

            </div>

            {/* Location */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold text-slate-500">
                LOCATION
              </p>

              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4">
                {complaint.latitude != null &&
                complaint.longitude != null ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>
                      <p className="mb-1 text-xs text-slate-500">
                        Latitude
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {complaint.latitude}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-xs text-slate-500">
                        Longitude
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {complaint.longitude}
                      </p>
                    </div>

                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    Location was not provided with this complaint.
                  </p>
                )}
              </div>
            </div>

            {/* Officer Status Update */}
            {userRole === "officer" && (
              <div className="mt-8 rounded-xl border border-orange-100 bg-white">

                <div className="border-b border-orange-100 px-5 py-4">
                  <p className="text-xs font-semibold text-slate-500">
                    UPDATE STATUS
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Complaint Status
                  </h2>
                </div>

                <div className="p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                    <select
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setStatusError("");
                        setStatusMessage("");
                      }}
                      className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100 sm:max-w-xs"
                    >
                      <option value="under_review">
                        Under Review
                      </option>

                      <option value="in_progress">
                        In Progress
                      </option>

                      <option value="resolved">
                        Resolved
                      </option>
                    </select>

                    <button
                      type="button"
                      onClick={handleStatusUpdate}
                      disabled={updatingStatus}
                      className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {updatingStatus
                        ? "Updating..."
                        : "Update Status"}
                    </button>

                  </div>

                  {statusMessage && (
                    <p className="mt-3 text-sm font-medium text-green-600">
                      {statusMessage}
                    </p>
                  )}

                  {statusError && (
                    <p className="mt-3 text-sm font-medium text-red-600">
                      {statusError}
                    </p>
                  )}
                </div>

              </div>
            )}

            {/* Progress */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold text-slate-500">
                REQUEST PROGRESS
              </p>

              <div className="flex items-center">

                <div
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    progressStep >= 1
                      ? "bg-orange-500"
                      : "bg-slate-300"
                  }`}
                />

                <div
                  className={`h-1 flex-1 ${
                    progressStep >= 2
                      ? "bg-orange-500"
                      : "bg-slate-200"
                  }`}
                />

                <div
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    progressStep >= 2
                      ? "bg-orange-500"
                      : "bg-slate-300"
                  }`}
                />

                <div
                  className={`h-1 flex-1 ${
                    progressStep >= 3
                      ? "bg-green-500"
                      : "bg-slate-200"
                  }`}
                />

                <div
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    progressStep >= 3
                      ? "bg-green-500"
                      : "bg-slate-300"
                  }`}
                />

              </div>

              <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                <span>Submitted</span>
                <span>Under Review / In Progress</span>
                <span>Resolved</span>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-8 border-t border-orange-100 pt-5">
              <p className="text-xs text-slate-500">
                Last updated
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {formatDate(complaint.updated_at)}
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}