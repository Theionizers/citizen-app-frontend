import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-5">
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
              className="relative text-sm font-medium text-white hover:text-orange-300 transition-colors duration-200 group"
            >
              Home
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-400 scale-x-100 rounded-full" />
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
            className="lg:hidden w-10 h-10 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/25 transition"
            aria-label="Open menu"
          >
            <span className="text-xl">☰</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;