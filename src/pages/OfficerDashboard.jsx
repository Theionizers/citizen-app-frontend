import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { officerApi } from "../api/officer";

const normalizeStatus = (status = "") =>
  status.toLowerCase().replaceAll("_", " ").trim();

const formatStatus = (status = "") =>
  normalizeStatus(status).replace(/\b\w/g, (char) =>
    char.toUpperCase()
  );

const formatDate = (date) => {
  if (!date) return "-";

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

const statusStyles = {
  assigned: "bg-blue-50 text-blue-600 border-blue-100",
  submitted: "bg-slate-50 text-slate-600 border-slate-200",
  "under review":
    "bg-orange-50 text-orange-600 border-orange-100",
  "in progress":
    "bg-amber-50 text-amber-600 border-amber-100",
  "pending citizen":
    "bg-yellow-50 text-yellow-600 border-yellow-100",
  resolved: "bg-green-50 text-green-600 border-green-100",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

function StatCard({
  title,
  value,
  subtitle,
  icon,
  cardClass,
  iconClass,
}) {
  return (
    <div
      className={`group rounded-2xl border p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)] ${cardClass}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-700">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <span className="text-lg">{icon}</span>
        </div>
      </div>
    </div>
  );
}

export default function OfficerDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await officerApi.getAssignedComplaints();

      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(
        "Failed to load officer complaints:",
        err
      );

      setError(
        err.message || "Failed to load complaints."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const stats = useMemo(() => {
    return {
      total: complaints.length,

      assigned: complaints.filter((complaint) => {
        const status = normalizeStatus(
          complaint.status
        );

        return (
          complaint.assigned_officer_id != null &&
          status !== "resolved" &&
          status !== "closed"
        );
      }).length,

      inProgress: complaints.filter(
        (complaint) =>
          normalizeStatus(complaint.status) ===
          "in progress"
      ).length,

      resolved: complaints.filter(
        (complaint) =>
          normalizeStatus(complaint.status) ===
          "resolved"
      ).length,
    };
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    const query = search.toLowerCase().trim();

    return complaints.filter((complaint) => {
      const description =
        complaint.description?.toLowerCase() || "";

      const complaintId = String(
        complaint.id || ""
      );

      const matchesSearch =
        !query ||
        complaintId.includes(query) ||
        description.includes(query);

      const complaintStatus = normalizeStatus(
        complaint.status
      );

      const matchesStatus =
        statusFilter === "all" ||
        complaintStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, search, statusFilter]);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const handleViewDetails = (complaint) => {
    navigate(`/complaint/${complaint.id}`, {
      state: {
        complaint,
        fromOfficerDashboard: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[230px_1fr]">

          {/* ================= SIDEBAR ================= */}
          <aside className="hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-[0_6px_24px_rgba(90,60,30,0.04)] lg:block">
            <nav className="space-y-1">

              <button
                type="button"
                onClick={() =>
                  handleStatusFilter("all")
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${statusFilter === "all"
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                <span>▦</span>
                Dashboard
              </button>

              <button
                type="button"
                onClick={() =>
                  handleStatusFilter("all")
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${statusFilter === "all"
                    ? "bg-orange-50 font-semibold text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                <span>□</span>
                My Cases
              </button>

              <button
                type="button"
                onClick={() =>
                  handleStatusFilter("in progress")
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${statusFilter === "in progress"
                    ? "bg-orange-50 font-semibold text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                <span>◷</span>
                In Progress
              </button>

              <button
                type="button"
                onClick={() =>
                  handleStatusFilter("pending citizen")
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${statusFilter === "pending citizen"
                    ? "bg-orange-50 font-semibold text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                <span>⌛</span>
                Pending Citizen
              </button>

              <button
                type="button"
                onClick={() =>
                  handleStatusFilter("resolved")
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${statusFilter === "resolved"
                    ? "bg-orange-50 font-semibold text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                <span>✓</span>
                Resolved
              </button>

              <button
                type="button"
                onClick={() =>
                  handleStatusFilter("closed")
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${statusFilter === "closed"
                    ? "bg-orange-50 font-semibold text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                <span>□</span>
                Closed
              </button>

            </nav>

            <div className="my-5 border-t border-orange-100" />

            <div className="rounded-xl bg-[#FFF8F1] p-4">
              <p className="text-sm font-semibold text-slate-800">
                Officer Portal
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Manage complaints assigned to your officer
                account.
              </p>
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <section>

            {/* PAGE HEADER */}
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-600">
                  Officer Portal
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Officer Dashboard
                </h1>

                <p className="mt-2 text-slate-500">
                  Review and manage complaints assigned to you.
                </p>
              </div>

              <button
                type="button"
                onClick={loadComplaints}
                disabled={loading}
                className="rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                ↻{" "}
                {loading
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

            </div>

            {/* WELCOME */}
            <div className="mb-7 rounded-2xl border border-orange-200 bg-orange-50 p-6 shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

              <p className="text-sm font-semibold text-orange-700">
                Welcome back
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Manage your assigned cases
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-orange-900/70">
                Keep track of citizen complaints and their
                current status from one place.
              </p>

            </div>

            {/* ================= STATS ================= */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                title="Total Cases"
                value={stats.total}
                subtitle="All assigned cases"
                icon="▣"
                cardClass="border-orange-300 bg-orange-100"
                iconClass="bg-orange-200 text-orange-700"
              />

              <StatCard
                title="Assigned"
                value={stats.assigned}
                subtitle="Cases currently assigned"
                icon="◷"
                cardClass="border-blue-300 bg-blue-100"
                iconClass="bg-blue-200 text-blue-700"
              />

              <StatCard
                title="In Progress"
                value={stats.inProgress}
                subtitle="Currently being handled"
                icon="↻"
                cardClass="border-amber-300 bg-amber-100"
                iconClass="bg-amber-200 text-amber-700"
              />

              <StatCard
                title="Resolved"
                value={stats.resolved}
                subtitle="Successfully resolved"
                icon="✓"
                cardClass="border-green-300 bg-green-100"
                iconClass="bg-green-200 text-green-700"
              />

            </div>

            {/* ================= COMPLAINTS ================= */}
            <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

              {/* SECTION HEADER */}
              <div className="border-b border-orange-100 p-6">

                <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Assigned Complaints
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      View complaints currently assigned to you.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">

                    {/* SEARCH */}
                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        ⌕
                      </span>

                      <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                        placeholder="Search complaint..."
                        className="w-full rounded-xl border border-orange-100 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 sm:w-64"
                      />

                    </div>

                    {/* STATUS */}
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value)
                      }
                      className="rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                    >
                      <option value="all">
                        All Status
                      </option>

                      <option value="assigned">
                        Assigned
                      </option>

                      <option value="submitted">
                        Submitted
                      </option>

                      <option value="under review">
                        Under Review
                      </option>

                      <option value="in progress">
                        In Progress
                      </option>

                      <option value="pending citizen">
                        Pending Citizen
                      </option>

                      <option value="resolved">
                        Resolved
                      </option>

                      <option value="closed">
                        Closed
                      </option>
                    </select>

                  </div>
                </div>

              </div>

              {/* ERROR */}
              {error && (
                <div className="m-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* LOADING */}
              {loading && (
                <div className="space-y-4 p-6">

                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse rounded-xl border border-orange-100 p-6"
                    >
                      <div className="h-5 w-24 rounded bg-slate-100" />

                      <div className="mt-4 h-5 w-2/3 rounded bg-slate-100" />

                      <div className="mt-4 h-4 w-1/2 rounded bg-slate-100" />
                    </div>
                  ))}

                </div>
              )}

              {/* EMPTY */}
              {!loading &&
                filteredComplaints.length === 0 && (
                  <div className="px-6 py-16 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700">
                      ▣
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      No complaints found
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                      {complaints.length === 0
                        ? "There are currently no complaints assigned to your officer account."
                        : "No complaint matches your current search or status filter."}
                    </p>

                    {complaints.length > 0 && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                      >
                        Clear filters
                      </button>
                    )}

                  </div>
                )}

              {/* COMPLAINT LIST */}
              {!loading &&
                filteredComplaints.length > 0 && (
                  <div className="space-y-4 p-5 md:p-6">

                    {filteredComplaints.map((complaint) => {
                      const status =
                        normalizeStatus(
                          complaint.status
                        );

                      const statusClass =
                        statusStyles[status] ||
                        "border-slate-200 bg-slate-50 text-slate-600";

                      return (
                        <article
                          key={complaint.id}
                          className="group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 transition-all duration-200 hover:border-orange-200 hover:shadow-[0_8px_26px_rgba(90,60,30,0.07)] md:p-6"
                        >

                          <div className="absolute left-0 top-0 h-full w-1 bg-orange-500" />

                          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr_auto] xl:items-center">

                            {/* COMPLAINT INFO */}
                            <div>

                              <div className="flex flex-wrap items-center gap-3">

                                <span className="text-sm font-bold text-orange-600">
                                  OZO-{complaint.id}
                                </span>

                                <span
                                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                                >
                                  {formatStatus(
                                    complaint.status
                                  )}
                                </span>

                              </div>

                              <h3 className="mt-4 text-lg font-bold leading-7 text-slate-900">
                                {complaint.description ||
                                  "-"}
                              </h3>

                              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                                <div>
                                  <p className="text-xs font-medium text-slate-400">
                                    Department
                                  </p>

                                  <p className="mt-1 text-sm font-semibold text-slate-700">
                                    #
                                    {complaint.department_id ??
                                      "-"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs font-medium text-slate-400">
                                    Service
                                  </p>

                                  <p className="mt-1 text-sm font-semibold text-slate-700">
                                    #
                                    {complaint.service_id ??
                                      "-"}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-xs font-medium text-slate-400">
                                    Created On
                                  </p>

                                  <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {formatDate(
                                      complaint.created_at
                                    )}
                                  </p>
                                </div>

                              </div>

                            </div>

                            {/* EXPECTED RESOLUTION */}
                            <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

                              <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">
                                Expected Resolution
                              </p>

                              <p className="mt-3 text-sm leading-6 text-slate-600">
                                {complaint.expected_resolution ||
                                  "-"}
                              </p>

                              <div className="mt-4 border-t border-orange-200 pt-4">

                                <div className="flex items-center justify-between">

                                  <span className="text-xs text-slate-500">
                                    Routing Confidence
                                  </span>

                                  <span className="text-sm font-bold text-green-700">
                                    {complaint.routing_confidence !=
                                      null
                                      ? `${Math.round(
                                        complaint.routing_confidence *
                                        100
                                      )}%`
                                      : "-"}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* ACTION */}
                            <div className="xl:pl-2">

                              <button
                                type="button"
                                onClick={() =>
                                  handleViewDetails(
                                    complaint
                                  )
                                }
                                className="w-full rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md xl:w-auto"
                              >
                                View Details →
                              </button>

                            </div>

                          </div>

                        </article>
                      );
                    })}

                    <div className="pt-2 text-sm text-slate-400">
                      Showing{" "}
                      {filteredComplaints.length} of{" "}
                      {complaints.length} complaints
                    </div>

                  </div>
                )}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}