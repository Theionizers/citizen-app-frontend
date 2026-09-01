import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { complaintApi } from "../api/complaints";

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
  const normalized = status?.toLowerCase();

  if (normalized === "resolved" || normalized === "closed") {
    return 3;
  }

  if (
    normalized === "in progress" ||
    normalized === "processing" ||
    normalized === "under_review"
  ) {
    return 2;
  }

  return 1;
};

const getStatusStyle = (status) => {
  const normalized = status?.toLowerCase();

  if (normalized === "resolved" || normalized === "closed") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (
    normalized === "in progress" ||
    normalized === "processing" ||
    normalized === "under_review"
  ) {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await complaintApi.getById(id);

        setComplaint(data);
      } catch (err) {
        console.error("Failed to load complaint:", err);
        setError(err.message || "Unable to load complaint details.");
      } finally {
        setLoading(false);
      }
    };

    loadComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8F1]">
        <Navbar />

        <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-8 text-center">
              <p className="text-sm font-medium text-slate-600">
                Loading complaint details...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen bg-[#FFF8F1]">
        <Navbar />

        <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
          <div className="max-w-5xl mx-auto">
            <button
              type="button"
              onClick={() => navigate("/my-complaints")}
              className="mb-6 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
            >
              ← Back to My Requests
            </button>

            <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-8 text-center">
              <h1 className="text-xl font-bold text-slate-900">
                Complaint details not available
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {error || "Unable to load complaint details."}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const progressStep = getProgressStep(complaint.status);

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/my-complaints")}
            className="mb-6 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
          >
            ← Back to My Requests
          </button>

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-orange-600 mb-2">
              CITIZEN SERVICES
            </p>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-sm font-semibold text-orange-600">
                    OZO-{complaint.id}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {formatStatus(complaint.status)}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Complaint Details
                </h1>

                <p className="mt-3 text-slate-600">
                  Track the status and details of your submitted request.
                </p>
              </div>

              <p className="text-sm text-slate-500">
                {formatDate(complaint.created_at)}
              </p>
            </div>
          </div>

          {/* Complaint Card */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-6 sm:p-8">

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2">
                COMPLAINT
              </p>

              <p className="text-base sm:text-lg leading-7 text-slate-800">
                {complaint.description || "No complaint description available."}
              </p>
            </div>

            {/* Complaint Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

              {/* Department */}
              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                <p className="text-xs text-slate-500 mb-1">
                  Department
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.department_id
  ? `Department #${complaint.department_id}`
  : "Not assigned"}
                </p>
              </div>

              {/* Service */}
              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                <p className="text-xs text-slate-500 mb-1">
                  Service
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.service_id
  ? `Service #${complaint.service_id}`
  : "Not assigned"}
                </p>
              </div>

              {/* Expected Resolution */}
              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4 sm:col-span-2">
                <p className="text-xs text-slate-500 mb-1">
                  Expected Resolution
                </p>

                <p className="text-sm font-semibold text-slate-800 leading-6">
                  {complaint.expected_resolution || "Not available"}
                </p>
              </div>

              {/* Routing Confidence */}
              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                <p className="text-xs text-slate-500 mb-1">
                  Routing Confidence
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {complaint.routing_confidence != null
                    ? `${Math.round(complaint.routing_confidence * 100)}%`
                    : "—"}
                </p>
              </div>

              {/* Assigned Officer */}
              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                <p className="text-xs text-slate-500 mb-1">
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
              <p className="text-xs font-semibold text-slate-500 mb-3">
                LOCATION
              </p>

              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                {complaint.latitude != null &&
                  complaint.longitude != null ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">
                        Latitude
                      </p>

                      <p className="text-sm font-semibold text-slate-800">
                        {complaint.latitude}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 mb-1">
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

            {/* Request Progress */}
            <div className="mt-8">

              <p className="text-xs font-semibold text-slate-500 mb-3">
                REQUEST PROGRESS
              </p>

              <div className="flex items-center">

                {/* Submitted */}
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${progressStep >= 1
                      ? "bg-orange-500"
                      : "bg-slate-300"
                    }`}
                />

                <div
                  className={`h-1 flex-1 ${progressStep >= 2
                      ? "bg-orange-500"
                      : "bg-slate-200"
                    }`}
                />

                {/* Processing */}
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${progressStep >= 2
                      ? "bg-orange-500"
                      : "bg-slate-300"
                    }`}
                />

                <div
                  className={`h-1 flex-1 ${progressStep >= 3
                      ? "bg-orange-500"
                      : "bg-slate-200"
                    }`}
                />

                {/* Resolved */}
                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${progressStep >= 3
                      ? "bg-green-500"
                      : "bg-slate-300"
                    }`}
                />

              </div>

              <div className="flex justify-between mt-2 text-[11px] text-slate-500">
                <span>Submitted</span>
                <span>Processing</span>
                <span>Resolved</span>
              </div>

            </div>

            {/* Last Updated */}
            <div className="mt-8 pt-5 border-t border-orange-100">
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
};

export default ComplaintDetails;