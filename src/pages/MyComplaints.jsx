import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { complaintApi } from "../api/complaints";

const getStatusStyle = (status) => {
  const normalized = status?.toLowerCase();

  if (normalized === "resolved" || normalized === "closed") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (
    normalized === "in progress" ||
    normalized === "processing"
  ) {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

const getProgressStep = (status) => {
  const normalized = status?.toLowerCase();

  if (normalized === "resolved" || normalized === "closed") {
    return 3;
  }

  if (
    normalized === "in progress" ||
    normalized === "processing"
  ) {
    return 2;
  }

  return 1;
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

const MyComplaints = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      navigate("/login");
      return;
    }

    const loadComplaints = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await complaintApi.getMyComplaints();

        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load complaints:", err);
        setError(err.message || "Unable to load your complaints.");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, [navigate]);

  const summary = useMemo(() => {
    const total = complaints.length;

    const inProgress = complaints.filter((complaint) => {
      const status = complaint.status?.toLowerCase();

      return (
        status === "in progress" ||
        status === "processing"
      );
    }).length;

    const resolved = complaints.filter((complaint) => {
      const status = complaint.status?.toLowerCase();

      return (
        status === "resolved" ||
        status === "closed"
      );
    }).length;

    return {
      total,
      inProgress,
      resolved,
    };
  }, [complaints]);

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <p className="text-sm font-semibold text-orange-600 mb-2">
              CITIZEN SERVICES
            </p>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  My Requests
                </h1>

                <p className="mt-3 text-slate-600 max-w-2xl">
                  Track your submitted complaints and stay updated on their
                  progress.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/submit-complaint")}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                + New Complaint
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <div className="bg-[#FFFDF9] rounded-2xl border border-orange-200 p-5 shadow-md shadow-orange-900/5">
              <p className="text-sm text-slate-500">
                Total Requests
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {summary.total}
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-orange-200 p-5 shadow-md shadow-orange-900/5">
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600">
                {summary.inProgress}
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-orange-200 p-5 shadow-md shadow-orange-900/5">
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {summary.resolved}
              </p>
            </div>

          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 p-12 text-center">
              <div className="w-10 h-10 mx-auto rounded-full border-4 border-orange-100 border-t-orange-600 animate-spin" />

              <p className="mt-4 text-sm text-slate-500">
                Loading your requests...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
              <h2 className="font-semibold text-red-700">
                Unable to load your requests
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && complaints.length === 0 && (
            <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 p-12 text-center">
              <div className="text-4xl mb-4">
                📋
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                No requests yet
              </h2>

              <p className="mt-2 text-slate-500">
                You haven't submitted any complaints yet.
              </p>

              <button
                type="button"
                onClick={() => navigate("/submit-complaint")}
                className="mt-6 px-5 py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition"
              >
                Submit Your First Complaint
              </button>
            </div>
          )}

          {/* Complaint List */}
          {!loading && !error && complaints.length > 0 && (
            <div className="space-y-5">

              {complaints.map((complaint) => {
                const progressStep = getProgressStep(
                  complaint.status
                );

                return (
                  <div
                    key={complaint.id}
                    className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-6 sm:p-7 hover:shadow-xl hover:border-orange-300 transition-all duration-200"
                  >

                    {/* Complaint Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">

                          <span className="text-xs font-semibold text-orange-600">
                            #{complaint.id}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                              complaint.status
                            )}`}
                          >
                            {complaint.status || "Submitted"}
                          </span>

                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                          {complaint.description
                            ? complaint.description.length > 70
                              ? `${complaint.description.slice(0, 70)}...`
                              : complaint.description
                            : "Complaint"}
                        </h2>
                      </div>

                      <p className="text-sm text-slate-500">
                        {formatDate(complaint.created_at)}
                      </p>

                    </div>

                    {/* Complaint Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

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

                    </div>

                    {/* Progress */}
                    <div className="mt-6">

                      <p className="text-xs font-semibold text-slate-500 mb-3">
                        REQUEST PROGRESS
                      </p>

                      <div className="flex items-center">

                        <div
                          className={`w-3 h-3 rounded-full shrink-0 ${
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
                          className={`w-3 h-3 rounded-full shrink-0 ${
                            progressStep >= 2
                              ? "bg-orange-500"
                              : "bg-slate-300"
                          }`}
                        />

                        <div
                          className={`h-1 flex-1 ${
                            progressStep >= 3
                              ? "bg-orange-500"
                              : "bg-slate-200"
                          }`}
                        />

                        <div
                          className={`w-3 h-3 rounded-full shrink-0 ${
                            progressStep >= 3
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

                    {/* View Details */}
                    <div className="mt-6 pt-5 border-t border-orange-100 flex justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/complaint/${complaint.id}`)
                        }
                        className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:translate-x-0.5 transition-all duration-200"
                      >
                        View Details →
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default MyComplaints;