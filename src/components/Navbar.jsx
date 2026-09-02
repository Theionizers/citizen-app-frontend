import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      return;
    }

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("access_token");
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setMobileOpen(false);
    navigate("/login");
  };

  const role = user?.role;

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

  const officerLinks = [
    {
      label: "Dashboard",
      path: "/officer-dashboard",
    },
  ];

  const departmentLinks = [
    {
      label: "Dashboard",
      path: "/department-dashboard",
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin-dashboard",
    },
  ];

  let links = [];

  if (role === "citizen") {
    links = citizenLinks;
  } else if (role === "officer") {
    links = officerLinks;
  } else if (role === "department") {
    links = departmentLinks;
  } else if (role === "admin") {
    links = adminLinks;
  }

  const isActive = (path) => {
    if (path.includes("#")) {
      return false;
    }

    return location.pathname === path;
  };

  return (
    <header className="relative z-50 mx-auto w-[calc(100%-32px)] max-w-[1385px] pt-4">
      <nav className="rounded-2xl border border-orange-100 bg-white shadow-[0_6px_24px_rgba(90,60,30,0.06)]">

        {/* ================= DESKTOP ================= */}
        <div className="flex min-h-[70px] items-center justify-between gap-5 px-5 py-3 lg:px-6">

          {/* LOGO */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex items-center">
              <img
                src="/ozoco-logo.png"
                alt="OZOCO"
                className="h-14 w-32 object-contain"
              />
            </div>


          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                  ? "bg-orange-50 text-orange-600"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-2 sm:flex">

            {/* CITIZEN ACTION */}
            {role === "citizen" && (
              <Link
                to="/submit-complaint"
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 ${location.pathname === "/submit-complaint"
                  ? "bg-orange-700 text-white"
                  : "bg-orange-600 text-white hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md"
                  }`}
              >
                Submit Complaint
              </Link>
            )}

            {/* ROLE */}
            {user && (
              <div className="hidden rounded-xl border border-orange-100 bg-[#FFF8F1] px-3.5 py-2.5 text-sm font-medium capitalize text-orange-700 md:block">
                {role}
              </div>
            )}

            {/* LOGOUT */}
            {user && (
              <button
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Logout
              </button>
            )}

            {/* LOGIN */}
            {!user && (
              <Link
                to="/login"
                className="rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* ================= MOBILE ================= */}
        {mobileOpen && (
          <div className="border-t border-orange-100 px-5 pb-5 pt-3 sm:hidden">
            <div className="space-y-1">

              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive(link.path)
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* CITIZEN BUTTON */}
              {role === "citizen" && (
                <Link
                  to="/submit-complaint"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                >
                  Submit Complaint
                </Link>
              )}

              {/* ROLE */}
              {user && (
                <div className="mt-3 rounded-xl border border-orange-100 bg-[#FFF8F1] px-4 py-3 text-sm font-medium capitalize text-orange-700">
                  Logged in as {role}
                </div>
              )}

              {/* LOGOUT */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                >
                  Logout
                </button>
              )}

              {/* LOGIN */}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-orange-700"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}