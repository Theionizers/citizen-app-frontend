import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { complaintApi } from "../api/complaints";

const normalizeStatus = (status = "") =>
  status.toLowerCase().replaceAll("_", " ").trim();

const formatStatus = (status = "") =>
  normalizeStatus(status).replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

const getStatusStyle = (status) => {
  const normalized = normalizeStatus(status);

  if (
    normalized === "resolved" ||
    normalized === "closed"
  ) {
    return "bg-green-100 text-green-700 border-green-300";
  }

  if (
    normalized === "under review" ||
    normalized === "in progress" ||
    normalized === "processing"
  ) {
    return "bg-amber-100 text-amber-700 border-amber-300";
  }

  if (normalized === "assigned") {
    return "bg-blue-100 text-blue-700 border-blue-300";
  }

  return "bg-slate-100 text-slate-600 border-slate-300";
};

const getProgressStep = (status) => {
  const normalized = normalizeStatus(status);

  if (
    normalized === "resolved" ||
    normalized === "closed"
  ) {
    return 4;
  }

  if (normalized === "in progress") {
    return 3;
  }

  if (
    normalized === "under review" ||
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
    const loadComplaints = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await complaintApi.getMyComplaints();

        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load complaints:", err);

        setError(
          err.message || "Unable to load your complaints."
        );
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, [navigate]);

  const summary = useMemo(() => {
    const total = complaints.length;

    const submitted = complaints.filter((complaint) => {
      const status = normalizeStatus(complaint.status);

      return (
        status === "submitted" ||
        status === "assigned"
      );
    }).length;

    const inProgress = complaints.filter((complaint) => {
      const status = normalizeStatus(complaint.status);

      return (
        status === "under review" ||
        status === "in progress" ||
        status === "processing"
      );
    }).length;

    const resolved = complaints.filter((complaint) => {
      const status = normalizeStatus(complaint.status);

      return (
        status === "resolved" ||
        status === "closed"
      );
    }).length;

    return {
      total,
      submitted,
      inProgress,
      resolved,
    };
  }, [complaints]);

  const handleViewDetails = (complaint) => {
    navigate(`/complaint/${complaint.id}`, {
      state: {
        complaint,
        fromCitizenRequests: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-slate-900">
      <Navbar />

      <main className="px-5 pb-16 pt-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">

          {/* ================= HEADER ================= */}
          <div className="mb-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-600">
                  Citizen Services
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  My Requests
                </h1>

                <p className="mt-3 max-w-2xl text-slate-600">
                  Track your submitted complaints and stay updated on
                  their progress.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/submit-complaint")}
                className="w-full rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md sm:w-auto"
              >
                + New Complaint
              </button>

            </div>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* TOTAL */}
            <div className="group rounded-2xl border border-orange-300 bg-orange-100 p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)]">

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">
                    Total Requests
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {summary.total}
                  </p>

                  <p className="mt-1 text-xs text-orange-700">
                    All submitted requests
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-200 text-orange-700">
                  <span className="text-lg">▣</span>
                </div>
              </div>

            </div>

            {/* SUBMITTED */}
            <div className="group rounded-2xl border border-blue-300 bg-blue-100 p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)]">

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Submitted
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {summary.submitted}
                  </p>

                  <p className="mt-1 text-xs text-blue-700">
                    New or assigned requests
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-200 text-blue-700">
                  <span className="text-lg">◷</span>
                </div>
              </div>

            </div>

            {/* IN PROGRESS */}
            <div className="group rounded-2xl border border-amber-300 bg-amber-100 p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)]">

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    In Progress
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {summary.inProgress}
                  </p>

                  <p className="mt-1 text-xs text-amber-700">
                    Under review or being handled
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-200 text-amber-700">
                  <span className="text-lg">↻</span>
                </div>
              </div>

            </div>

            {/* RESOLVED */}
            <div className="group rounded-2xl border border-green-300 bg-green-100 p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-green-400 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)]">

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Resolved
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {summary.resolved}
                  </p>

                  <p className="mt-1 text-xs text-green-700">
                    Completed requests
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-200 text-green-700">
                  <span className="text-lg">✓</span>
                </div>
              </div>

            </div>

          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="rounded-2xl border border-orange-100 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading your requests...
              </p>

            </div>
          )}

          {/* ================= ERROR ================= */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

              <h2 className="font-semibold text-red-700">
                Unable to load your requests
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>

            </div>
          )}

          {/* ================= EMPTY ================= */}
          {!loading &&
            !error &&
            complaints.length === 0 && (
              <div className="rounded-2xl border border-orange-100 bg-white p-12 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700">
                  ▣
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-900">
                  No requests yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  You haven't submitted any complaints yet.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/submit-complaint")
                  }
                  className="mt-6 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-700"
                >
                  Submit Your First Complaint
                </button>

              </div>
            )}

          {/* ================= COMPLAINT LIST ================= */}
          {!loading &&
            !error &&
            complaints.length > 0 && (
              <div className="space-y-5">

                {complaints.map((complaint) => {
                  const progressStep =
                    getProgressStep(
                      complaint.status
                    );

                  return (
                    <article
                      key={complaint.id}
                      className="group rounded-2xl border border-orange-200 bg-white p-6 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-[0_10px_30px_rgba(90,60,30,0.08)] sm:p-7"
                    >

                      {/* HEADER */}
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                        <div>

                          <div className="mb-2 flex flex-wrap items-center gap-3">

                            <span className="text-xs font-bold text-orange-600">
                              OZO-{complaint.id}
                            </span>

                            <span
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                complaint.status
                              )}`}
                            >
                              {formatStatus(
                                complaint.status
                              )}
                            </span>

                          </div>

                          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                            {complaint.description
                              ? complaint.description.length >
                                90
                                ? `${complaint.description.slice(
                                  0,
                                  90
                                )}...`
                                : complaint.description
                              : "Complaint"}
                          </h2>

                        </div>

                        <p className="text-sm text-slate-500">
                          {formatDate(
                            complaint.created_at
                          )}
                        </p>

                      </div>

                      {/* DETAILS */}
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">

                          <p className="mb-1 text-xs font-medium text-orange-700">
                            Department
                          </p>

                          <p className="text-sm font-semibold text-slate-800">
                            {complaint.department_id
                              ? `Department #${complaint.department_id}`
                              : "Not assigned"}
                          </p>

                        </div>

                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

                          <p className="mb-1 text-xs font-medium text-blue-700">
                            Service
                          </p>

                          <p className="text-sm font-semibold text-slate-800">
                            {complaint.service_id
                              ? `Service #${complaint.service_id}`
                              : "Not assigned"}
                          </p>

                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">

                          <p className="mb-1 text-xs font-medium text-green-700">
                            Last Updated
                          </p>

                          <p className="text-sm font-semibold text-slate-800">
                            {formatDate(
                              complaint.updated_at
                            )}
                          </p>

                        </div>

                      </div>

                      {/* PROGRESS */}
                      <div className="mt-7">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Request Progress
                        </p>

                        <div className="flex items-center">

                          <div
                            className={`h-3 w-3 shrink-0 rounded-full ${progressStep >= 1
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

                          <div
                            className={`h-3 w-3 shrink-0 rounded-full ${progressStep >= 2
                                ? "bg-amber-500"
                                : "bg-slate-300"
                              }`}
                          />

                          <div
                            className={`h-1 flex-1 ${progressStep >= 3
                                ? "bg-amber-500"
                                : "bg-slate-200"
                              }`}
                          />

                          <div
                            className={`h-3 w-3 shrink-0 rounded-full ${progressStep >= 3
                                ? "bg-amber-500"
                                : "bg-slate-300"
                              }`}
                          />

                          <div
                            className={`h-1 flex-1 ${progressStep >= 4
                                ? "bg-green-500"
                                : "bg-slate-200"
                              }`}
                          />

                          <div
                            className={`h-3 w-3 shrink-0 rounded-full ${progressStep >= 4
                                ? "bg-green-500"
                                : "bg-slate-300"
                              }`}
                          />

                        </div>

                        <div className="mt-2 flex justify-between text-[10px] text-slate-500 sm:text-[11px]">
                          <span>Submitted</span>
                          <span>Under Review</span>
                          <span>In Progress</span>
                          <span>Resolved</span>
                        </div>

                      </div>

                      {complaint.officer_note && (
                        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">

                          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                            Latest Update
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {complaint.officer_note}
                          </p>

                        </div>
                      )}

                      {/* FOOTER */}
                      <div className="mt-6 flex justify-end border-t border-orange-100 pt-5">

                        <button
                          type="button"
                          onClick={() =>
                            handleViewDetails(
                              complaint
                            )
                          }
                          className="rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-50 hover:text-orange-700"
                        >
                          View Details →
                        </button>

                      </div>

                    </article>
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