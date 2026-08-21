import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-5">

        {/* Navbar */}
        <div className="h-[70px] px-4 sm:px-6 flex items-center justify-between rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/ozoco-logo.png"
              alt="OZOCO"
              className="h-11 w-auto object-contain"
            />
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">

            <Link
              to="/"
              className="relative text-sm font-medium text-white hover:text-orange-300 transition-colors duration-200"
            >
              Home
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-400 rounded-full" />
            </Link>

            <a
              href="#services"
              className="text-sm font-medium text-white/90 hover:text-orange-300 transition-colors duration-200"
            >
              Services
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-white/90 hover:text-orange-300 transition-colors duration-200"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-white/90 hover:text-orange-300 transition-colors duration-200"
            >
              Features
            </a>

            {/* Divider */}
            <div className="h-7 w-px bg-white/20 ml-1" />

            {/* Login */}
            <Link
              to="/login"
              className="text-sm font-semibold text-white hover:text-orange-300 transition-colors duration-200"
            >
              Login
            </Link>

            {/* CTA */}
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition"
            aria-label="Toggle menu"
          >
            <span className="text-xl">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>

        </div>


        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl">

            <div className="flex flex-col gap-2">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Home
              </Link>

              <a
                href="#services"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Services
              </a>

              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                How It Works
              </a>

              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Features
              </a>

              <div className="h-px bg-white/10 my-1" />

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-white hover:bg-white/10 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl bg-orange-600 text-white text-center font-semibold hover:bg-orange-700 transition"
              >
                Get Started
              </Link>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;