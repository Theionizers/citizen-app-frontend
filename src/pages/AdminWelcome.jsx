import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminWelcome = () => {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    return (
        <div className="min-h-screen bg-[#FFF8F1]">
            <Navbar />

            <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-5 py-12 sm:px-8">

                <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-xl shadow-orange-900/10">

                    <div className="grid lg:grid-cols-2">

                        {/* LEFT */}
                        <div className="relative overflow-hidden bg-slate-900 px-7 py-12 sm:px-10 lg:px-12">

                            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
                            <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />

                            <div className="relative z-10 flex h-full flex-col justify-between">

                                <div>
                                    <img
                                        src="/ozoco-logo.png"
                                        alt="OZOCO"
                                        className="h-12 w-auto object-contain"
                                    />
                                    <p className="mt-2 text-xs text-slate-400">
                                        AI Citizen Service Platform
                                    </p>
                                </div>

                                <div className="mt-16">

                                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                                        Administration Portal
                                    </p>

                                    <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
                                        Welcome back,
                                        <br />
                                        <span className="text-orange-400">
                                            {user?.name || "Admin"} 👋
                                        </span>
                                    </h1>

                                    <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                                        You have successfully signed in to the OZOCO
                                        administration portal. From here, you can monitor
                                        citizen requests, manage officers and departments,
                                        and oversee complaint resolution.
                                    </p>

                                </div>

                                <div className="mt-12 flex flex-wrap gap-3 text-xs text-slate-300">

                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                        Secure Access
                                    </span>

                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                        Complaint Management
                                    </span>

                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                        System Monitoring
                                    </span>

                                </div>

                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center px-7 py-12 sm:px-10 lg:px-12">

                            <div className="w-full">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-700">
                                    ⚙
                                </div>

                                <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
                                    Administration Overview
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Use the admin dashboard to keep an eye on the
                                    platform and manage the citizen complaint workflow.
                                </p>

                                <div className="mt-8 space-y-3">

                                    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Complaints
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Review complaints and monitor their current status.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Officers
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            View officers and manage complaint assignments.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                                        <p className="text-sm font-semibold text-slate-800">
                                            Departments
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Monitor the departments configured in the platform.
                                        </p>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/admin-dashboard")
                                    }
                                    className="mt-8 w-full rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700"
                                >
                                    Open Admin Dashboard →
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default AdminWelcome;