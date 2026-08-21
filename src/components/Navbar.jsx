import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/ozoco-logo.png"
              alt="OZOCO"
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-slate-800 hover:text-orange-600 transition"
            >
              Home
            </Link>

            <a
              href="#services"
              className="text-sm font-medium text-slate-800 hover:text-orange-600 transition"
            >
              Services
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-800 hover:text-orange-600 transition"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-800 hover:text-orange-600 transition"
            >
              Features
            </a>

            <Link
              to="/login"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 rounded-xl bg-white/90 border border-orange-100 shadow-sm flex items-center justify-center text-slate-700"
            aria-label="Open menu"
          >
            ☰
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;