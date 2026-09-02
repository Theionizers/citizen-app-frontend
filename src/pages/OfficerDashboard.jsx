import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { officerApi } from "../api/officer";

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

const getStatusClass = (status) => {
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

const OfficerDashboard = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await officerApi.getComplaints();

        setComplaints(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load officer complaints:", err);
        setError(err.message || "Unable to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  const stats = useMemo(() => {
    const total = complaints.length;

    const submitted = complaints.filter(
      (complaint) =>
        complaint.status?.toLowerCase() === "submitted"
    ).length;

    const inProgress = complaints.filter((complaint) => {
      const status = complaint.status?.toLowerCase();

      return (
        status === "in progress" ||
        status === "processing" ||
        status === "under_review"
      );
    }).length;

    const resolved = complaints.filter((complaint) => {
      const status = complaint.status?.toLowerCase();

      return status === "resolved" || status === "closed";
    }).length;

    return {
      total,
      submitted,
      inProgress,
      resolved,
    };
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        String(complaint.id).includes(searchText) ||
        complaint.description?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        complaint.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, search, statusFilter]);

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
              Officer Portal
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
              Officer Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Review and manage complaints assigned to you.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <p className="text-sm text-slate-500">
                Total Cases
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {stats.total}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <p className="text-sm text-slate-500">
                Submitted
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {stats.submitted}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <p className="mt-2 text-3xl font-bold text-orange-600">
                {stats.inProgress}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {stats.resolved}
              </p>
            </div>

          </div>

          {/* Complaints section */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 overflow-hidden">

            <div className="p-6 border-b border-orange-100">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Complaints
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    View complaints available to your officer account.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search complaint..."
                    className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-orange-100 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  />

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      setStatusFilter(event.target.value)
                    }
                    className="px-4 py-2.5 rounded-xl border border-orange-100 bg-white text-sm outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="all">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                </div>

              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-12 text-center">
                <p className="text-sm text-slate-500">
                  Loading complaints...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="p-12 text-center">
                <h3 className="text-lg font-bold text-slate-900">
                  Unable to load complaints
                </h3>

                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filteredComplaints.length === 0 && (
              <div className="p-12 text-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">
                  📋
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No complaints found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  No complaints are currently assigned to this officer.
                </p>

              </div>
            )}

            {/* Complaint list */}
            {!loading && !error && filteredComplaints.length > 0 && (
              <div className="divide-y divide-orange-100">

                {filteredComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-6 hover:bg-[#FFF8F1] transition"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3 mb-3">

                          <span className="text-sm font-bold text-orange-600">
                            OZO-{complaint.id}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusClass(
                              complaint.status
                            )}`}
                          >
                            {formatStatus(complaint.status)}
                          </span>

                        </div>

                        <p className="text-base font-semibold text-slate-900 leading-6">
                          {complaint.description ||
                            "No complaint description available."}
                        </p>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-slate-500">

                          <span>
                            Department:{" "}
                            {complaint.department_id
                              ? `#${complaint.department_id}`
                              : "Not assigned"}
                          </span>

                          <span>
                            Service:{" "}
                            {complaint.service_id
                              ? `#${complaint.service_id}`
                              : "Not assigned"}
                          </span>

                          <span>
                            Created: {formatDate(complaint.created_at)}
                          </span>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/complaint/${complaint.id}`)
                        }
                        className="shrink-0 px-5 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition"
                      >
                        View Details
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
};

export default OfficerDashboard;