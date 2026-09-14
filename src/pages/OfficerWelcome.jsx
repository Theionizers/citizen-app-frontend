import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const OfficerWelcome = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div className="min-h-screen bg-[#FFF8F1] text-slate-900">
      <Navbar />

      <main className="min-h-[calc(100vh-72px)] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex min-h-[calc(100vh-152px)] max-w-7xl items-center">

          <div className="relative w-full overflow-hidden rounded-[32px] border border-orange-200 bg-slate-900 shadow-2xl shadow-orange-900/10">

            {/* Decorative background */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr]">

              {/* ================= LEFT ================= */}
              <div className="flex flex-col justify-between px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">

                {/* Logo */}
                <div>
                  <img
                    src="/JanaMaan_logo.png"
                    alt="OZOCO"
                    className="h-12 w-auto object-contain"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    AI Citizen Service Platform
                  </p>
                </div>

                {/* Main content */}
                <div className="mt-14 lg:mt-20">

                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                      Officer Portal
                    </span>
                  </div>

                  <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                    Welcome back,
                    <br />
                    <span className="text-orange-400">
                      {user?.name || "Officer"} 👋
                    </span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                    Your service desk is ready. Review assigned citizen
                    complaints, update case status, and help move requests
                    toward resolution.
                  </p>

                  {/* Action */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/officer-dashboard")
                    }
                    className="mt-9 inline-flex items-center justify-center rounded-xl bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700"
                  >
                    Open Officer Dashboard
                    <span className="ml-2 text-base">
                      →
                    </span>
                  </button>

                </div>

                {/* Bottom highlights */}
                <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6">

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    Assigned Cases
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    Status Updates
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    Resolution
                  </div>

                </div>

              </div>

              {/* ================= RIGHT ================= */}
              <div className="relative flex items-center px-7 py-10 sm:px-10 lg:px-12">

                {/* Vertical divider */}
                <div className="absolute left-0 top-12 hidden h-[calc(100%-96px)] w-px bg-white/10 lg:block" />

                <div className="w-full">

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    Your Workspace
                  </p>

                  <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    Everything you need
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Access the tools available to you from your officer
                    workspace.
                  </p>

                  {/* Workspace points */}
                  <div className="mt-9 space-y-6">

                    <div className="flex gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-orange-300">
                        ✓
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Assigned Complaints
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          View complaints assigned to your department
                          and handle the cases that need attention.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                        ↻
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Case Status
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          Keep citizen requests updated as you review
                          and process each complaint.
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-400/10 text-green-300">
                        ✓
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Citizen Resolution
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          Help move requests from assignment through
                          resolution with clear updates.
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Access indicator */}
                  <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">

                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-xs text-slate-500">
                          Current Access
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                          Officer
                        </p>
                      </div>

                      <div className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-300">
                        Active
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default OfficerWelcome;