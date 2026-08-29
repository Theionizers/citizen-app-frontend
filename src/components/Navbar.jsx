import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role;

  // Homepage has the original transparent style.
  // Other pages use a light navbar so text remains visible.
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-5">

        {/* Navbar */}
        <div
          className={`h-[70px] px-4 sm:px-6 flex items-center justify-between rounded-2xl border shadow-lg transition-all duration-200 ${isHome
              ? "bg-white/10 backdrop-blur-md border-white/20"
              : "bg-white border-orange-100 shadow-orange-900/10"
            }`}
        >

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/ozoco-logo.png"
              alt="OZOCO"
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">

            {/* Home */}
            <Link
              to="/"
              className={`relative text-sm font-medium transition-colors duration-200 ${isHome
                  ? "text-white hover:text-orange-300"
                  : "text-slate-700 hover:text-orange-600"
                }`}
            >
              Home

              {isHome && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-400 rounded-full" />
              )}
            </Link>

            {/* Services */}
            <a
              href="/#services"
              className={`text-sm font-medium transition-colors duration-200 ${isHome
                  ? "text-white/90 hover:text-orange-300"
                  : "text-slate-700 hover:text-orange-600"
                }`}
            >
              Services
            </a>

            {/* How It Works */}
            <a
              href="/#how-it-works"
              className={`text-sm font-medium transition-colors duration-200 ${isHome
                  ? "text-white/90 hover:text-orange-300"
                  : "text-slate-700 hover:text-orange-600"
                }`}
            >
              How It Works
            </a>

            {/* Features */}
            <a
              href="/#features"
              className={`text-sm font-medium transition-colors duration-200 ${isHome
                  ? "text-white/90 hover:text-orange-300"
                  : "text-slate-700 hover:text-orange-600"
                }`}
            >
              Features
            </a>

            {/* Divider */}
            <div
              className={`h-7 w-px ml-1 ${isHome ? "bg-white/20" : "bg-slate-200"
                }`}
            />

            {/* Logged-in user */}
            {role ? (
              <>
                {/* My Requests */}
                <Link
                  to="/my-complaints"
                  className={`text-sm font-semibold transition-colors duration-200 ${isHome
                      ? "text-white hover:text-orange-300"
                      : "text-slate-700 hover:text-orange-600"
                    }`}
                >
                  My Requests
                </Link>

                {/* Submit Complaint */}
                <Link
                  to="/submit-complaint"
                  className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Submit Complaint
                </Link>

                {/* Role */}
                <span
                  className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize ${isHome
                      ? "bg-orange-500/20 border border-orange-400/30 text-orange-200"
                      : "bg-orange-50 border border-orange-200 text-orange-700"
                    }`}
                >
                  {role}
                </span>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isHome
                      ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                      : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className={`text-sm font-semibold transition-colors duration-200 ${isHome
                      ? "text-white hover:text-orange-300"
                      : "text-slate-700 hover:text-orange-600"
                    }`}
                >
                  Login
                </Link>

                {/* Get Started */}
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition ${isHome
                ? "bg-white/15 border border-white/20 text-white hover:bg-white/25"
                : "bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100"
              }`}
            aria-label="Toggle menu"
          >
            <span className="text-xl">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className={`lg:hidden mt-3 p-4 rounded-2xl backdrop-blur-xl border shadow-xl ${isHome
                ? "bg-slate-900/90 border-white/10"
                : "bg-white border-orange-100"
              }`}
          >
            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl transition ${isHome
                    ? "text-white hover:bg-white/10"
                    : "text-slate-700 hover:bg-orange-50"
                  }`}
              >
                Home
              </Link>

              <a
                href="/#services"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl transition ${isHome
                    ? "text-white hover:bg-white/10"
                    : "text-slate-700 hover:bg-orange-50"
                  }`}
              >
                Services
              </a>

              <a
                href="/#how-it-works"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl transition ${isHome
                    ? "text-white hover:bg-white/10"
                    : "text-slate-700 hover:bg-orange-50"
                  }`}
              >
                How It Works
              </a>

              <a
                href="/#features"
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl transition ${isHome
                    ? "text-white hover:bg-white/10"
                    : "text-slate-700 hover:bg-orange-50"
                  }`}
              >
                Features
              </a>

              <div
                className={`h-px my-1 ${isHome ? "bg-white/10" : "bg-slate-200"
                  }`}
              />

              {role ? (
                <>
                  <Link
                    to="/my-complaints"
                    onClick={closeMenu}
                    className={`px-4 py-3 rounded-xl transition ${isHome
                        ? "text-white hover:bg-white/10"
                        : "text-slate-700 hover:bg-orange-50"
                      }`}
                  >
                    My Requests
                  </Link>

                  <Link
                    to="/submit-complaint"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl bg-orange-600 text-white text-center font-semibold hover:bg-orange-700 transition"
                  >
                    Submit Complaint
                  </Link>

                  <span
                    className={`px-4 py-3 rounded-xl font-semibold capitalize ${isHome
                        ? "bg-orange-500/10 border border-orange-400/20 text-orange-300"
                        : "bg-orange-50 border border-orange-200 text-orange-700"
                      }`}
                  >
                    {role}
                  </span>

                  <button
                    onClick={handleLogout}
                    className={`px-4 py-3 rounded-xl font-semibold transition ${isHome
                        ? "bg-white/10 border border-white/10 text-white hover:bg-white/15"
                        : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                      }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={`px-4 py-3 rounded-xl transition ${isHome
                        ? "text-white hover:bg-white/10"
                        : "text-slate-700 hover:bg-orange-50"
                      }`}
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl bg-orange-600 text-white text-center font-semibold hover:bg-orange-700 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;