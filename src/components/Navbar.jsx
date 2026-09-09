import { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      return;
    }

    const fetchCurrentUser = async () => {
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
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          setUser(null);
          return;
        }

        const data = await response.json();

        setUser(data);

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error
        );
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setUser(null);
    setMobileOpen(false);

    navigate("/login");
  };

  const role = user?.role;

  /* =====================================================
     PUBLIC NAVIGATION
  ===================================================== */

  const publicLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Services",
      path: "/#services",
    },
    {
      label: "How It Works",
      path: "/#how-it-works",
    },
    {
      label: "Features",
      path: "/#features",
    },
  ];

  /* =====================================================
     CITIZEN NAVIGATION
  ===================================================== */

  const citizenLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Services",
      path: "/#services",
    },
    {
      label: "How It Works",
      path: "/#how-it-works",
    },
    {
      label: "Features",
      path: "/#features",
    },
    {
      label: "My Requests",
      path: "/my-complaints",
    },
  ];

  /* =====================================================
     OFFICER NAVIGATION
  ===================================================== */

  const officerLinks = [
    {
      label: "Dashboard",
      path: "/officer-dashboard",
    },
  ];

  /* =====================================================
     DEPARTMENT NAVIGATION
  ===================================================== */

  const departmentLinks = [
    {
      label: "Dashboard",
      path: "/department-dashboard",
    },
  ];

  /* =====================================================
     ADMIN NAVIGATION
  ===================================================== */

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin-dashboard",
    },
  ];

  /* =====================================================
     SELECT NAVIGATION
  ===================================================== */

  let links = publicLinks;

  if (role === "citizen") {
    links = citizenLinks;
  } else if (role === "officer") {
    links = officerLinks;
  } else if (role === "department") {
    links = departmentLinks;
  } else if (role === "admin") {
    links = adminLinks;
  }

  /* =====================================================
     DASHBOARD PATH
  ===================================================== */

  const dashboardPath =
    role === "admin"
      ? "/admin-dashboard"
      : role === "officer"
      ? "/officer-dashboard"
      : role === "department"
      ? "/department-dashboard"
      : null;

  /* =====================================================
     ACTIVE LINK
  ===================================================== */

  const isActive = (path) => {
    if (path.includes("#")) {
      return false;
    }

    return location.pathname === path;
  };

  return (
    <header className="relative z-50 mx-auto w-[calc(100%-32px)] max-w-[1385px] pt-4">

      <nav className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.06)]">

        {/* =====================================================
            MAIN NAVBAR
        ===================================================== */}

        <div className="flex min-h-[72px] items-center gap-2 px-3 py-3 min-[380px]:gap-3 min-[420px]:px-4 sm:gap-4 sm:px-5 lg:gap-5 lg:px-6">

          {/* ===================================================
              MOBILE MENU BUTTON
          =================================================== */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-base font-semibold text-orange-700 shadow-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-800 min-[420px]:h-11 min-[420px]:w-11 min-[420px]:text-lg lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          {/* ===================================================
              LOGO
          =================================================== */}

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex shrink-0 items-center"
          >
            <img
              src="/ozoco-logo.png"
              alt="OZOCO"
              className="h-9 w-[88px] object-contain min-[380px]:h-10 min-[380px]:w-24 min-[420px]:h-11 min-[420px]:w-28 sm:h-12 sm:w-32"
            />
          </Link>

          {/* ===================================================
              PUBLIC / LOGGED-IN MOBILE CENTER
          =================================================== */}

          <div className="min-w-0 flex-1 lg:hidden">

            {!user ? (
              <div className="flex items-center justify-end gap-2">

                {/* Public CTA */}
                <Link
                  to="/login"
                  className="hidden rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-700 min-[430px]:block"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hidden rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-xs font-semibold text-orange-700 transition-all duration-200 hover:bg-orange-100 min-[600px]:block"
                >
                  Get Started
                </Link>

              </div>
            ) : (
              <div className="flex items-center justify-end gap-1.5 min-[380px]:gap-2 sm:gap-3">

                {/* -------------------------------------------
                    CITIZEN → MY REQUESTS
                ------------------------------------------- */}

                {role === "citizen" && (
                  <Link
                    to="/my-complaints"
                    className={`rounded-xl border px-2.5 py-2 text-[10px] font-semibold transition-all duration-200 min-[380px]:px-3 min-[380px]:text-xs ${
                      location.pathname ===
                      "/my-complaints"
                        ? "border-orange-200 bg-orange-100 text-orange-700"
                        : "border-orange-100 bg-orange-50 text-orange-700 hover:border-orange-200 hover:bg-orange-100"
                    }`}
                  >
                    My Requests
                  </Link>
                )}

                {/* -------------------------------------------
                    ADMIN / OFFICER / DEPARTMENT → DASHBOARD
                ------------------------------------------- */}

                {(role === "admin" ||
                  role === "officer" ||
                  role === "department") &&
                  dashboardPath && (
                    <Link
                      to={dashboardPath}
                      className={`hidden rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 min-[600px]:block ${
                        location.pathname ===
                        dashboardPath
                          ? "border-orange-200 bg-orange-100 text-orange-700"
                          : "border-orange-100 bg-orange-50 text-orange-700 hover:border-orange-200 hover:bg-orange-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}

                {/* -------------------------------------------
                    ACTIVE
                    HIDDEN ON VERY SMALL SCREENS
                ------------------------------------------- */}

                <div className="hidden items-center gap-1.5 rounded-xl border border-green-100 bg-green-50 px-3 py-2 min-[500px]:flex">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-[10px] font-semibold text-green-600 sm:text-xs">
                    Active
                  </span>

                </div>

                {/* -------------------------------------------
                    ROLE
                    CITIZEN HIDDEN
                ------------------------------------------- */}

                {role !== "citizen" && (
                  <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] px-2.5 py-2 text-[10px] font-semibold capitalize text-orange-700 min-[380px]:px-3 min-[380px]:text-xs sm:px-3.5 sm:text-sm">
                    {role}
                  </div>
                )}

              </div>
            )}

          </div>

          {/* ===================================================
              DESKTOP NAV LINKS
          =================================================== */}

          <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">

            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

          </div>

          {/* ===================================================
              DESKTOP RIGHT SIDE
          =================================================== */}

          <div className="hidden items-center gap-2 lg:flex">

            {/* PUBLIC USER */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* CITIZEN ACTION */}
            {role === "citizen" && (
              <Link
                to="/submit-complaint"
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 ${
                  location.pathname ===
                  "/submit-complaint"
                    ? "bg-orange-700 text-white"
                    : "bg-orange-600 text-white hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md"
                }`}
              >
                Submit Complaint
              </Link>
            )}

            {/* ROLE */}
            {user && (
              <div className="rounded-xl border border-orange-100 bg-[#FFF8F1] px-3.5 py-2.5 text-sm font-medium capitalize text-orange-700">
                {role}
              </div>
            )}

            {/* LOGOUT */}
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Logout
              </button>
            )}

          </div>

        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {mobileOpen && (
          <div className="border-t border-orange-100 bg-[#FFFDF9] px-4 pb-5 pt-4 lg:hidden">

            {/* =================================================
                LOGGED OUT MOBILE HEADER
            ================================================= */}

            {!user && (
              <div className="mb-4 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3">

                <p className="text-sm font-semibold text-slate-800">
                  Welcome to OZOCO
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  AI-powered citizen service platform
                  for simple and transparent civic requests.
                </p>

              </div>
            )}

            {/* =================================================
                LOGGED IN USER INFO
            ================================================= */}

            {user && (
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-orange-100 bg-[#FFF8F1] px-4 py-3">

                <div>

                  <p className="text-sm font-semibold capitalize text-slate-800">
                    {role === "citizen"
                      ? "My OZOCO"
                      : `${role} Portal`}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    OZOCO Service Platform
                  </p>

                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  <span className="text-xs font-semibold text-green-600">
                    Active
                  </span>

                </div>

              </div>
            )}

            {/* =================================================
                NAVIGATION LINKS
            ================================================= */}

            <div className="space-y-1">

              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-orange-50 font-semibold text-orange-600"
                      : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* =================================================
                  LOGGED OUT ACTIONS
              ================================================= */}

              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="mt-2 block rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center text-sm font-semibold text-orange-700 transition-colors duration-200 hover:bg-orange-100"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="mt-2 block rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
                  >
                    Get Started
                  </Link>
                </>
              )}

              {/* =================================================
                  CITIZEN SUBMIT
              ================================================= */}

              {role === "citizen" && (
                <Link
                  to="/submit-complaint"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="mt-2 block rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
                >
                  Submit Complaint
                </Link>
              )}

              {/* =================================================
                  LOGOUT
              ================================================= */}

              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                >
                  Logout
                </button>
              )}

            </div>

          </div>
        )}

      </nav>

    </header>
  );
}