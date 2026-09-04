import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:8000";

const getToken = () => {
    return localStorage.getItem("access_token");
};

const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
});

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
    submitted:
        "border-slate-200 bg-slate-50 text-slate-600",

    assigned:
        "border-blue-100 bg-blue-50 text-blue-600",

    "under review":
        "border-orange-100 bg-orange-50 text-orange-600",

    "in progress":
        "border-amber-100 bg-amber-50 text-amber-600",

    resolved:
        "border-green-100 bg-green-50 text-green-600",

    closed:
        "border-slate-200 bg-slate-100 text-slate-600",
};

function StatCard({
    title,
    value,
    subtitle,
    icon,
    iconClass,
}) {
    return (
        <div className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
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

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [officers, setOfficers] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                navigate("/login");
                return;
            }

            const [complaintsResponse, officersResponse, departmentsResponse] =
                await Promise.all([
                    fetch(`${API_BASE_URL}/complaints/admin`, {
                        method: "GET",
                        headers: authHeaders(),
                    }),

                    fetch(`${API_BASE_URL}/complaints/admin/officers`, {
                        method: "GET",
                        headers: authHeaders(),
                    }),

                    fetch(`${API_BASE_URL}/complaints/admin/departments`, {
                        method: "GET",
                        headers: authHeaders(),
                    }),
                ]);

            const complaintsData = await complaintsResponse.json();
            const officersData = await officersResponse.json();
            const departmentsData = await departmentsResponse.json();

            if (!complaintsResponse.ok) {
                throw new Error(
                    complaintsData.detail ||
                    "Failed to load complaints."
                );
            }

            if (!officersResponse.ok) {
                throw new Error(
                    officersData.detail ||
                    "Failed to load officers."
                );
            }

            if (!departmentsResponse.ok) {
                throw new Error(
                    departmentsData.detail ||
                    "Failed to load departments."
                );
            }

            setComplaints(
                Array.isArray(complaintsData)
                    ? complaintsData
                    : []
            );

            setOfficers(
                Array.isArray(officersData)
                    ? officersData
                    : []
            );

            setDepartments(
                Array.isArray(departmentsData)
                    ? departmentsData
                    : []
            );
        } catch (err) {
            console.error("Failed to load admin dashboard:", err);

            setError(
                err.message ||
                "Unable to load admin dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    /*
      Dashboard statistics are calculated
      only from real backend complaint data.
    */
    const stats = useMemo(() => {
        const total = complaints.length;

        const resolved = complaints.filter(
            (complaint) =>
                normalizeStatus(complaint.status) === "resolved"
        ).length;

        const inProgress = complaints.filter(
            (complaint) =>
                normalizeStatus(complaint.status) === "in progress"
        ).length;

        const assigned = complaints.filter(
            (complaint) =>
                complaint.assigned_officer_id != null &&
                normalizeStatus(complaint.status) !== "resolved" &&
                normalizeStatus(complaint.status) !== "closed"
        ).length;

        return {
            total,
            resolved,
            inProgress,
            assigned,
        };
    }, [complaints]);

    /*
      Search and status filtering.
    */
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

            const status = normalizeStatus(
                complaint.status
            );

            const matchesStatus =
                statusFilter === "all" ||
                status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [complaints, search, statusFilter]);

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
    };

    const openComplaintDetails = (complaint) => {
        navigate(`/complaint/${complaint.id}`, {
            state: {
                complaint,
                fromAdminDashboard: true,
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#FFF8F1] text-slate-900">
            <Navbar />

            <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
                <section>

                    {/* ================= HEADER ================= */}
                    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-600">
                                Administration
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                Admin Dashboard
                            </h1>

                            <p className="mt-2 text-slate-500">
                                Monitor complaints, officers and departments.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={fetchAdminData}
                            disabled={loading}
                            className="rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            ↻ {loading ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>

                    {/* ================= STATS ================= */}
                    <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <StatCard
                            title="Total Complaints"
                            value={stats.total}
                            subtitle="All complaints"
                            icon="▣"
                            iconClass="bg-orange-50 text-orange-600"
                        />

                        <StatCard
                            title="Assigned"
                            value={stats.assigned}
                            subtitle="Currently assigned"
                            icon="◷"
                            iconClass="bg-blue-50 text-blue-600"
                        />

                        <StatCard
                            title="In Progress"
                            value={stats.inProgress}
                            subtitle="Currently being handled"
                            icon="↻"
                            iconClass="bg-amber-50 text-amber-600"
                        />

                        <StatCard
                            title="Resolved"
                            value={stats.resolved}
                            subtitle="Successfully resolved"
                            icon="✓"
                            iconClass="bg-green-50 text-green-600"
                        />

                    </div>

                    {/* ================= COMPLAINTS ================= */}
                    <div className="mb-7 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                        <div className="border-b border-orange-100 p-6">
                            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">

                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Complaints
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Monitor all complaints submitted to the platform.
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

                                    {/* FILTER */}
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="submitted">
                                            Submitted
                                        </option>
                                        <option value="assigned">
                                            Assigned
                                        </option>
                                        <option value="under review">
                                            Under Review
                                        </option>
                                        <option value="in progress">
                                            In Progress
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
                                        className="animate-pulse rounded-xl border border-orange-100 p-5"
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
                            !error &&
                            filteredComplaints.length === 0 && (
                                <div className="px-6 py-16 text-center">

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-600">
                                        ▣
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        No complaints found
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                        {complaints.length === 0
                                            ? "There are currently no complaints in the system."
                                            : "No complaint matches your current search or filter."}
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

                        {/* COMPLAINT TABLE */}
                        {!loading &&
                            filteredComplaints.length > 0 && (
                                <div className="overflow-x-auto">

                                    <table className="min-w-[900px] w-full">
                                        <thead>
                                            <tr className="border-b border-orange-100 bg-[#FFF8F1] text-left">
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    ID
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Complaint
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Status
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Department
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Service
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Officer
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Created
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredComplaints.map(
                                                (complaint) => {
                                                    const status =
                                                        normalizeStatus(
                                                            complaint.status
                                                        );

                                                    const statusClass =
                                                        statusStyles[status] ||
                                                        "border-slate-200 bg-slate-50 text-slate-600";

                                                    return (
                                                        <tr
                                                            key={complaint.id}
                                                            className="border-b border-orange-50 transition-colors duration-150 hover:bg-[#FFFCF9]"
                                                        >
                                                            <td className="px-6 py-5">
                                                                <span className="font-semibold text-orange-600">
                                                                    OZO-{complaint.id}
                                                                </span>
                                                            </td>

                                                            <td className="max-w-[300px] px-6 py-5">
                                                                <p className="truncate text-sm font-medium text-slate-800">
                                                                    {complaint.description ||
                                                                        "-"}
                                                                </p>
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <span
                                                                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                                                                >
                                                                    {formatStatus(
                                                                        complaint.status
                                                                    )}
                                                                </span>
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                #{complaint.department_id ??
                                                                    "-"}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                #{complaint.service_id ??
                                                                    "-"}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                                {complaint.assigned_officer_id
                                                                    ? `#${complaint.assigned_officer_id}`
                                                                    : "Not assigned"}
                                                            </td>

                                                            <td className="px-6 py-5 text-sm text-slate-500">
                                                                {formatDate(
                                                                    complaint.created_at
                                                                )}
                                                            </td>

                                                            <td className="px-6 py-5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openComplaintDetails(
                                                                            complaint
                                                                        )
                                                                    }
                                                                    className="whitespace-nowrap rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-600 transition-all duration-200 hover:bg-orange-50"
                                                                >
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>

                                </div>
                            )}

                        {!loading &&
                            filteredComplaints.length > 0 && (
                                <div className="border-t border-orange-100 px-6 py-4 text-sm text-slate-400">
                                    Showing {filteredComplaints.length} of{" "}
                                    {complaints.length} complaints
                                </div>
                            )}

                    </div>

                    {/* ================= OFFICERS + DEPARTMENTS ================= */}
                    <div className="grid gap-7 xl:grid-cols-2">

                        {/* OFFICERS */}
                        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                            <div className="border-b border-orange-100 p-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Officers
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Officers currently available in the system.
                                </p>
                            </div>

                            {officers.length === 0 ? (
                                <div className="p-8 text-center text-sm text-slate-500">
                                    No officers found.
                                </div>
                            ) : (
                                <div className="divide-y divide-orange-50">
                                    {officers.map((officer) => (
                                        <div
                                            key={officer.id}
                                            className="flex items-center justify-between gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#FFFCF9]"
                                        >
                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-800">
                                                    {officer.name}
                                                </p>

                                                <p className="mt-1 truncate text-sm text-slate-500">
                                                    {officer.email}
                                                </p>
                                            </div>

                                            <div className="shrink-0 rounded-lg bg-[#FFF8F1] px-3 py-2 text-xs font-semibold text-orange-700">
                                                Department #
                                                {officer.department_id ?? "-"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-t border-orange-100 px-6 py-4 text-sm text-slate-400">
                                {officers.length} officer
                                {officers.length !== 1 ? "s" : ""} found
                            </div>

                        </div>

                        {/* DEPARTMENTS */}
                        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                            <div className="border-b border-orange-100 p-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Departments
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Departments currently available in the system.
                                </p>
                            </div>

                            {departments.length === 0 ? (
                                <div className="p-8 text-center text-sm text-slate-500">
                                    No departments found.
                                </div>
                            ) : (
                                <div className="grid gap-3 p-5 sm:grid-cols-2">

                                    {departments.map((department) => (
                                        <div
                                            key={department.id}
                                            className="rounded-xl border border-orange-100 bg-[#FFF8F1] p-4 transition-all duration-200 hover:border-orange-200 hover:bg-white"
                                        >
                                            <p className="text-xs font-semibold text-orange-600">
                                                Department #{department.id}
                                            </p>

                                            <p className="mt-2 text-sm font-semibold leading-5 text-slate-800">
                                                {department.name}
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            )}

                            <div className="border-t border-orange-100 px-6 py-4 text-sm text-slate-400">
                                {departments.length} department
                                {departments.length !== 1 ? "s" : ""} found
                            </div>

                        </div>

                    </div>

                </section>
            </main>
        </div>
    );
}
