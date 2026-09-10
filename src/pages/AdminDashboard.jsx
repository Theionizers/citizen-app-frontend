
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateOfficer from "../components/admin/CreateOfficer";

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
    "pending citizen":
        "border-yellow-100 bg-yellow-50 text-yellow-600",
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
    cardClass,
    iconClass,
}) {
    return (
        <div
            className={`group rounded-2xl border p-5 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(90,60,30,0.08)] ${cardClass}`}
        >
            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="text-sm font-medium text-slate-600">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        {subtitle}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
                >
                    <span className="text-lg">
                        {icon}
                    </span>
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

    const [activeSection, setActiveSection] =
        useState("dashboard");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("all");

    const [selectedOfficer, setSelectedOfficer] =
        useState({});

    const [assigningComplaint, setAssigningComplaint] =
        useState(null);

    const [assignMessage, setAssignMessage] =
        useState("");

    const [assignError, setAssignError] =
        useState("");

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                navigate("/login");
                return;
            }

            const [
                complaintsResponse,
                officersResponse,
                departmentsResponse,
            ] = await Promise.all([
                fetch(
                    `${API_BASE_URL}/complaints/admin`,
                    {
                        method: "GET",
                        headers: authHeaders(),
                    }
                ),

                fetch(
                    `${API_BASE_URL}/complaints/admin/officers`,
                    {
                        method: "GET",
                        headers: authHeaders(),
                    }
                ),

                fetch(
                    `${API_BASE_URL}/complaints/admin/departments`,
                    {
                        method: "GET",
                        headers: authHeaders(),
                    }
                ),
            ]);

            const complaintsData =
                await complaintsResponse.json();

            const officersData =
                await officersResponse.json();

            const departmentsData =
                await departmentsResponse.json();

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
            console.error(
                "Failed to load admin dashboard:",
                err
            );

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

    const stats = useMemo(() => {
        const total = complaints.length;

        const assigned = complaints.filter(
            (complaint) => {
                const status = normalizeStatus(
                    complaint.status
                );

                return (
                    complaint.assigned_officer_id !=
                    null &&
                    status !== "resolved" &&
                    status !== "closed"
                );
            }
        ).length;

        const inProgress = complaints.filter(
            (complaint) =>
                normalizeStatus(
                    complaint.status
                ) === "in progress"
        ).length;

        const resolved = complaints.filter(
            (complaint) =>
                normalizeStatus(
                    complaint.status
                ) === "resolved"
        ).length;

        return {
            total,
            assigned,
            inProgress,
            resolved,
        };
    }, [complaints]);

    const filteredComplaints = useMemo(() => {
        const query = search.toLowerCase().trim();

        return complaints.filter((complaint) => {
            const description =
                complaint.description?.toLowerCase() ||
                "";

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

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [
        complaints,
        search,
        statusFilter,
    ]);

    const openComplaintDetails = (
        complaint
    ) => {
        navigate(
            `/complaint/${complaint.id}`,
            {
                state: {
                    complaint,
                    fromAdminDashboard: true,
                },
            }
        );
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
    };

    /*
      Get officers belonging to a complaint's department.
    */
    const getDepartmentOfficers = (
        departmentId
    ) => {
        return officers.filter(
            (officer) =>
                String(
                    officer.department_id
                ) === String(departmentId)
        );
    };

    /*
      Assign complaint to selected officer.
    */
    const handleAssignOfficer = async (
        complaint
    ) => {
        const officerId =
            selectedOfficer[complaint.id];

        if (!officerId) {
            setAssignError(
                "Please select an officer first."
            );

            setAssignMessage("");

            return;
        }

        try {
            setAssigningComplaint(
                complaint.id
            );

            setAssignError("");
            setAssignMessage("");

            const response = await fetch(
                `${API_BASE_URL}/complaints/${complaint.id}/assign`,
                {
                    method: "PATCH",
                    headers: authHeaders(),
                    body: JSON.stringify({
                        officer_id: Number(
                            officerId
                        ),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail ||
                    "Failed to assign officer."
                );
            }

            setAssignMessage(
                `Complaint OZO-${complaint.id} assigned successfully.`
            );

            /*
              Clear selected officer for this complaint.
            */
            setSelectedOfficer(
                (previous) => {
                    const updated = {
                        ...previous,
                    };

                    delete updated[
                        complaint.id
                    ];

                    return updated;
                }
            );

            /*
              Refresh complaints so status,
              assigned officer and stats update.
            */
            await fetchAdminData();
        } catch (err) {
            console.error(
                "Failed to assign officer:",
                err
            );

            setAssignError(
                err.message ||
                "Failed to assign officer."
            );
        } finally {
            setAssigningComplaint(null);
        }
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
                                    setActiveSection(
                                        "dashboard"
                                    )
                                }
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${activeSection ===
                                    "dashboard"
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                            >
                                <span>▦</span>
                                Dashboard
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setActiveSection(
                                        "complaints"
                                    );

                                    setStatusFilter(
                                        "all"
                                    );
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${activeSection ===
                                    "complaints"
                                    ? "bg-orange-50 font-semibold text-orange-600"
                                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                            >
                                <span>□</span>
                                Complaints
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveSection(
                                        "officers"
                                    )
                                }
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${activeSection ===
                                    "officers"
                                    ? "bg-orange-50 font-semibold text-orange-600"
                                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                            >
                                <span>♙</span>
                                Officers
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveSection(
                                        "departments"
                                    )
                                }
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${activeSection ===
                                    "departments"
                                    ? "bg-orange-50 font-semibold text-orange-600"
                                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                            >
                                <span>▤</span>
                                Departments
                            </button>

                        </nav>

                        <div className="my-5 border-t border-orange-100" />

                        <div className="rounded-xl bg-[#FFF8F1] p-4">

                            <p className="text-sm font-semibold text-slate-800">
                                Admin Portal
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Monitor complaints, officers and departments.
                            </p>

                        </div>

                    </aside>

                    {/* ================= MAIN ================= */}
                    <section>

                        {/* HEADER */}
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
                                onClick={
                                    fetchAdminData
                                }
                                disabled={loading}
                                className="rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                ↻{" "}
                                {loading
                                    ? "Refreshing..."
                                    : "Refresh"}
                            </button>

                        </div>

                        {/* GLOBAL ASSIGN MESSAGE */}
                        {assignMessage && (
                            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {assignMessage}
                            </div>
                        )}

                        {assignError && (
                            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {assignError}
                            </div>
                        )}

                        {/* ================= DASHBOARD ================= */}
                        {activeSection ===
                            "dashboard" && (
                                <>
                                    <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                        <StatCard
                                            title="Total Complaints"
                                            value={stats.total}
                                            subtitle="All complaints"
                                            icon="▣"
                                            cardClass="border-orange-300 bg-orange-100"
                                            iconClass="bg-orange-200 text-orange-700"
                                        />

                                        <StatCard
                                            title="Assigned"
                                            value={stats.assigned}
                                            subtitle="Currently assigned"
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

                                    <div className="grid gap-7 xl:grid-cols-2">

                                        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                                            <div className="border-b border-orange-100 p-6">

                                                <h2 className="text-xl font-bold text-slate-900">
                                                    Complaint Overview
                                                </h2>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Current complaint status summary.
                                                </p>

                                            </div>

                                            <div className="grid gap-4 p-6 sm:grid-cols-2">

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveSection(
                                                            "complaints"
                                                        );

                                                        setStatusFilter(
                                                            "assigned"
                                                        );
                                                    }}
                                                    className="rounded-xl border border-blue-200 bg-blue-100 p-5 text-left transition-all duration-200 hover:border-blue-300 hover:shadow-sm"
                                                >
                                                    <p className="text-sm font-medium text-blue-700">
                                                        Assigned
                                                    </p>

                                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                                        {stats.assigned}
                                                    </p>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveSection(
                                                            "complaints"
                                                        );

                                                        setStatusFilter(
                                                            "in progress"
                                                        );
                                                    }}
                                                    className="rounded-xl border border-amber-200 bg-amber-100 p-5 text-left transition-all duration-200 hover:border-amber-300 hover:shadow-sm"
                                                >
                                                    <p className="text-sm font-medium text-amber-700">
                                                        In Progress
                                                    </p>

                                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                                        {stats.inProgress}
                                                    </p>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveSection(
                                                            "complaints"
                                                        );

                                                        setStatusFilter(
                                                            "resolved"
                                                        );
                                                    }}
                                                    className="rounded-xl border border-green-200 bg-green-100 p-5 text-left transition-all duration-200 hover:border-green-300 hover:shadow-sm"
                                                >
                                                    <p className="text-sm font-medium text-green-700">
                                                        Resolved
                                                    </p>

                                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                                        {stats.resolved}
                                                    </p>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveSection(
                                                            "complaints"
                                                        );

                                                        clearFilters();
                                                    }}
                                                    className="rounded-xl border border-orange-200 bg-orange-100 p-5 text-left transition-all duration-200 hover:border-orange-300"
                                                >
                                                    <p className="text-sm font-medium text-orange-700">
                                                        View All
                                                    </p>

                                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                                        {stats.total}
                                                    </p>
                                                </button>

                                            </div>
                                        </div>

                                        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                                            <div className="border-b border-orange-100 p-6">

                                                <h2 className="text-xl font-bold text-slate-900">
                                                    System Overview
                                                </h2>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Current data available in the platform.
                                                </p>

                                            </div>

                                            <div className="space-y-4 p-6">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveSection(
                                                            "officers"
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-100 px-5 py-4 text-left transition hover:border-blue-300 hover:shadow-sm"
                                                >
                                                    <div>

                                                        <p className="text-sm font-semibold text-slate-800">
                                                            Officers
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Officers registered in the system
                                                        </p>

                                                    </div>

                                                    <span className="text-xl font-bold text-blue-700">
                                                        {officers.length}
                                                    </span>

                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveSection(
                                                            "departments"
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between rounded-xl border border-orange-200 bg-orange-100 px-5 py-4 text-left transition hover:border-orange-300 hover:shadow-sm"
                                                >
                                                    <div>

                                                        <p className="text-sm font-semibold text-slate-800">
                                                            Departments
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Departments available in the system
                                                        </p>

                                                    </div>

                                                    <span className="text-xl font-bold text-orange-700">
                                                        {departments.length}
                                                    </span>

                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setActiveSection(
                                                            "complaints"
                                                        );

                                                        clearFilters();
                                                    }}
                                                    className="flex w-full items-center justify-between rounded-xl border border-green-200 bg-green-100 px-5 py-4 text-left transition hover:border-green-300 hover:shadow-sm"
                                                >
                                                    <div>

                                                        <p className="text-sm font-semibold text-slate-800">
                                                            Complaints
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Total complaints available
                                                        </p>

                                                    </div>

                                                    <span className="text-xl font-bold text-green-700">
                                                        {complaints.length}
                                                    </span>

                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}

                        {/* ================= COMPLAINTS ================= */}
                        {activeSection ===
                            "complaints" && (
                                <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                                    <div className="border-b border-orange-100 p-6">

                                        <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">

                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900">
                                                    Complaints
                                                </h2>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Monitor and assign complaints to officers.
                                                </p>
                                            </div>

                                            <div className="flex flex-col gap-3 sm:flex-row">

                                                <div className="relative">

                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                        ⌕
                                                    </span>

                                                    <input
                                                        type="text"
                                                        value={
                                                            search
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setSearch(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Search complaint..."
                                                        className="w-full rounded-xl border border-orange-100 bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-100 sm:w-64"
                                                    />

                                                </div>

                                                <select
                                                    value={
                                                        statusFilter
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        setStatusFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                                                >
                                                    <option value="all">
                                                        All Status
                                                    </option>

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

                                    {error && (
                                        <div className="m-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    {loading && (
                                        <div className="space-y-4 p-6">

                                            {[1, 2].map(
                                                (item) => (
                                                    <div
                                                        key={item}
                                                        className="animate-pulse rounded-xl border border-orange-100 p-5"
                                                    >
                                                        <div className="h-5 w-24 rounded bg-slate-100" />

                                                        <div className="mt-4 h-5 w-2/3 rounded bg-slate-100" />

                                                        <div className="mt-4 h-4 w-1/2 rounded bg-slate-100" />
                                                    </div>
                                                )
                                            )}

                                        </div>
                                    )}

                                    {!loading &&
                                        !error &&
                                        filteredComplaints.length ===
                                        0 && (
                                            <div className="px-6 py-16 text-center">

                                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-700">
                                                    ▣
                                                </div>

                                                <h3 className="mt-5 text-lg font-bold text-slate-900">
                                                    No complaints found
                                                </h3>

                                                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                                    {complaints.length ===
                                                        0
                                                        ? "There are currently no complaints in the system."
                                                        : "No complaint matches your current search or filter."}
                                                </p>

                                                {complaints.length >
                                                    0 && (
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                clearFilters
                                                            }
                                                            className="mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700"
                                                        >
                                                            Clear filters
                                                        </button>
                                                    )}

                                            </div>
                                        )}

                                    {!loading &&
                                        filteredComplaints.length >
                                        0 && (
                                            <div className="overflow-x-auto">

                                                <table className="min-w-[1100px] w-full">

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
                                                                Action
                                                            </th>

                                                        </tr>

                                                    </thead>

                                                    <tbody>

                                                        {filteredComplaints.map(
                                                            (
                                                                complaint
                                                            ) => {

                                                                const status =
                                                                    normalizeStatus(
                                                                        complaint.status
                                                                    );

                                                                const statusClass =
                                                                    statusStyles[
                                                                    status
                                                                    ] ||
                                                                    "border-slate-200 bg-slate-50 text-slate-600";

                                                                const departmentOfficers =
                                                                    getDepartmentOfficers(
                                                                        complaint.department_id
                                                                    );

                                                                const isAssigning =
                                                                    assigningComplaint ===
                                                                    complaint.id;

                                                                return (
                                                                    <tr
                                                                        key={
                                                                            complaint.id
                                                                        }
                                                                        className="border-b border-orange-50 transition-colors duration-150 hover:bg-[#FFFCF9]"
                                                                    >

                                                                        <td className="px-6 py-5 align-top">

                                                                            <span className="font-semibold text-orange-600">
                                                                                OZO-
                                                                                {
                                                                                    complaint.id
                                                                                }
                                                                            </span>

                                                                        </td>

                                                                        <td className="max-w-[300px] px-6 py-5 align-top">

                                                                            <p className="text-sm font-medium text-slate-800">
                                                                                {complaint.description ||
                                                                                    "-"}
                                                                            </p>

                                                                        </td>

                                                                        <td className="px-6 py-5 align-top">

                                                                            <span
                                                                                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
                                                                            >
                                                                                {formatStatus(
                                                                                    complaint.status
                                                                                )}
                                                                            </span>

                                                                        </td>

                                                                        <td className="px-6 py-5 align-top text-sm text-slate-600">

                                                                            #
                                                                            {
                                                                                complaint.department_id
                                                                            }

                                                                        </td>

                                                                        <td className="px-6 py-5 align-top text-sm text-slate-600">

                                                                            #
                                                                            {
                                                                                complaint.service_id
                                                                            }

                                                                        </td>

                                                                        <td className="px-6 py-5 align-top">

                                                                            {complaint.assigned_officer_id ? (
                                                                                <div>

                                                                                    <span className="inline-flex rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700">
                                                                                        Officer #
                                                                                        {
                                                                                            complaint.assigned_officer_id
                                                                                        }
                                                                                    </span>

                                                                                    <p className="mt-2 text-xs text-green-600">
                                                                                        ✓ Assigned
                                                                                    </p>

                                                                                </div>
                                                                            ) : (
                                                                                <div className="min-w-[190px]">

                                                                                    <p className="mb-2 text-xs font-medium text-slate-500">
                                                                                        Select officer
                                                                                    </p>

                                                                                    {departmentOfficers.length >
                                                                                        0 ? (
                                                                                        <select
                                                                                            value={
                                                                                                selectedOfficer[
                                                                                                complaint
                                                                                                    .id
                                                                                                ] ||
                                                                                                ""
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setSelectedOfficer(
                                                                                                    (
                                                                                                        previous
                                                                                                    ) => ({
                                                                                                        ...previous,
                                                                                                        [complaint.id]:
                                                                                                            e
                                                                                                                .target
                                                                                                                .value,
                                                                                                    })
                                                                                                )
                                                                                            }
                                                                                            disabled={
                                                                                                isAssigning
                                                                                            }
                                                                                            className="w-full rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                                                                                        >
                                                                                            <option value="">
                                                                                                Choose officer
                                                                                            </option>

                                                                                            {departmentOfficers.map(
                                                                                                (
                                                                                                    officer
                                                                                                ) => (
                                                                                                    <option
                                                                                                        key={
                                                                                                            officer.id
                                                                                                        }
                                                                                                        value={
                                                                                                            officer.id
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            officer.name
                                                                                                        }
                                                                                                    </option>
                                                                                                )
                                                                                            )}

                                                                                        </select>
                                                                                    ) : (
                                                                                        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                                                                                            No officer available
                                                                                        </p>
                                                                                    )}

                                                                                </div>
                                                                            )}

                                                                        </td>

                                                                        <td className="px-6 py-5 align-top">

                                                                            <div className="flex flex-col gap-2">

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

                                                                                {!complaint.assigned_officer_id &&
                                                                                    departmentOfficers.length >
                                                                                    0 && (
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                handleAssignOfficer(
                                                                                                    complaint
                                                                                                )
                                                                                            }
                                                                                            disabled={
                                                                                                isAssigning ||
                                                                                                !selectedOfficer[
                                                                                                complaint
                                                                                                    .id
                                                                                                ]
                                                                                            }
                                                                                            className="whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                                                        >
                                                                                            {isAssigning
                                                                                                ? "Assigning..."
                                                                                                : "Assign Officer"}
                                                                                        </button>
                                                                                    )}

                                                                            </div>

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
                                        filteredComplaints.length >
                                        0 && (
                                            <div className="border-t border-orange-100 px-6 py-4 text-sm text-slate-400">
                                                Showing{" "}
                                                {
                                                    filteredComplaints.length
                                                }{" "}
                                                of{" "}
                                                {
                                                    complaints.length
                                                }{" "}
                                                complaints
                                            </div>
                                        )}

                                </div>
                            )}

                        {/* ================= OFFICERS ================= */}
                        {activeSection ===
                            "officers" && (
                                <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                                    <div className="border-b border-orange-100 p-6">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900">
                                                    Officers
                                                </h2>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Officers currently available in the system.
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    document
                                                        .getElementById("create-officer-form")
                                                        ?.scrollIntoView({
                                                            behavior: "smooth",
                                                        });
                                                }}
                                                className="w-fit rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                                            >
                                                + Create Officer
                                            </button>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div className="p-6">

                                            <div className="animate-pulse rounded-xl border border-orange-100 p-6">

                                                <div className="h-5 w-32 rounded bg-slate-100" />

                                                <div className="mt-4 h-4 w-48 rounded bg-slate-100" />

                                            </div>

                                        </div>
                                    ) : officers.length ===
                                        0 ? (
                                        <div className="p-10 text-center text-sm text-slate-500">
                                            No officers found.
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-orange-50">

                                            {officers.map(
                                                (
                                                    officer
                                                ) => (
                                                    <div
                                                        key={
                                                            officer.id
                                                        }
                                                        className="flex flex-col gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#FFFCF9] sm:flex-row sm:items-center sm:justify-between"
                                                    >

                                                        <div>

                                                            <p className="font-semibold text-slate-800">
                                                                {
                                                                    officer.name
                                                                }
                                                            </p>

                                                            <p className="mt-1 text-sm text-slate-500">
                                                                {
                                                                    officer.email
                                                                }
                                                            </p>

                                                        </div>

                                                        <div className="w-fit rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700">
                                                            Department #
                                                            {
                                                                officer.department_id ??
                                                                "-"
                                                            }
                                                        </div>

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    )}
                                    <div id="create-officer-form">
                                        <CreateOfficer
                                            departments={departments}
                                            onSuccess={fetchAdminData}
                                        />
                                    </div>
                                    <div className="border-t border-orange-100 px-6 py-4 text-sm text-slate-400">
                                        {officers.length}{" "}
                                        officer
                                        {officers.length !==
                                            1
                                            ? "s"
                                            : ""}{" "}
                                        found
                                    </div>

                                </div>
                            )}

                        {/* ================= DEPARTMENTS ================= */}
                        {activeSection ===
                            "departments" && (
                                <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.04)]">

                                    <div className="border-b border-orange-100 p-6">

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Departments
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Departments currently available in the system.
                                        </p>

                                    </div>

                                    {loading ? (
                                        <div className="grid gap-3 p-6 sm:grid-cols-2">

                                            {[1, 2, 3, 4].map(
                                                (
                                                    item
                                                ) => (
                                                    <div
                                                        key={
                                                            item
                                                        }
                                                        className="animate-pulse rounded-xl border border-orange-100 p-5"
                                                    >

                                                        <div className="h-4 w-24 rounded bg-slate-100" />

                                                        <div className="mt-3 h-5 w-40 rounded bg-slate-100" />

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    ) : departments.length ===
                                        0 ? (
                                        <div className="p-10 text-center text-sm text-slate-500">
                                            No departments found.
                                        </div>
                                    ) : (
                                        <div className="grid gap-3 p-6 sm:grid-cols-2">

                                            {departments.map(
                                                (
                                                    department
                                                ) => (
                                                    <div
                                                        key={
                                                            department.id
                                                        }
                                                        className="rounded-xl border border-orange-200 bg-orange-100 p-5 transition-all duration-200 hover:border-orange-300 hover:bg-white hover:shadow-sm"
                                                    >

                                                        <p className="text-xs font-semibold text-orange-700">
                                                            Department #
                                                            {
                                                                department.id
                                                            }
                                                        </p>

                                                        <p className="mt-2 text-sm font-semibold leading-5 text-slate-800">
                                                            {
                                                                department.name
                                                            }
                                                        </p>

                                                    </div>
                                                )
                                            )}

                                        </div>
                                    )}

                                    <div className="border-t border-orange-100 px-6 py-4 text-sm text-slate-400">
                                        {departments.length}{" "}
                                        department
                                        {departments.length !==
                                            1
                                            ? "s"
                                            : ""}{" "}
                                        found
                                    </div>

                                </div>
                            )}

                    </section>
                </div>
            </main>
        </div>
    );
}