import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
   const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    await registerUser({
      name,
      email,
      password,
    });

    navigate("/login");
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#FFF8F1] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl min-h-[680px] bg-white rounded-[28px] shadow-xl overflow-hidden grid lg:grid-cols-2 border border-orange-100">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative overflow-hidden px-8 py-10 sm:px-12 lg:px-14 flex flex-col justify-between">

          {/* Background Image */}
          <img
            src="/login-bg.jpg
            "
            alt="Citizen services"
            className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/60" />

          {/* Orange Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-transparent to-slate-950/50" />

          {/* LOGO */}
          <div className="relative z-10">
            <img
              src="/ozoco-logo.png"
              alt="OZOCO"
              className="h-12 w-auto object-contain"
            />

            <p className="text-xs text-slate-300 mt-1 ml-1">
              AI Citizen Service Platform
            </p>
          </div>


          {/* MAIN CONTENT */}
          <div className="relative z-10 max-w-xl mt-12 lg:mt-0">

            <p className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">
              Join OZOCO
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-white">
              One platform.
              <br />

              <span className="text-orange-300">
                Every civic request.
              </span>

              <br />

              One simpler experience.
            </h2>

            <p className="mt-6 text-slate-200 text-base sm:text-lg leading-relaxed max-w-lg">
              Create your account to submit civic problems, receive
              service guidance, and track your requests from submission
              to resolution.
            </p>


            {/* FEATURES */}
            <div className="mt-8 space-y-4">

              {/* Feature 1 */}
              <div className="flex items-start gap-4">

                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  📝
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Report Your Problem
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Submit details, photos, or documents related to your issue.
                  </p>
                </div>

              </div>


              {/* Feature 2 */}
              <div className="flex items-start gap-4">

                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  ✨
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Get the Right Service
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    AI helps understand your request and identify the appropriate service.
                  </p>
                </div>

              </div>


              {/* Feature 3 */}
              <div className="flex items-start gap-4">

                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Smart Department Routing
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Your request can be routed to the appropriate department and jurisdiction.
                  </p>
                </div>

              </div>


              {/* Feature 4 */}
              <div className="flex items-start gap-4">

                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  🔎
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Track Your Request
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Stay informed about your request throughout the process.
                  </p>
                </div>

              </div>

            </div>
          </div>


          {/* FOOTER */}
          <div className="relative z-10 mt-10 flex items-center gap-6 text-xs text-slate-300">

            <span>Secure</span>

            <span className="w-1 h-1 rounded-full bg-orange-400" />

            <span>Transparent</span>

            <span className="w-1 h-1 rounded-full bg-orange-400" />

            <span>Citizen-focused</span>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="lg:hidden mb-8">

              <img
                src="/ozoco-logo.png"
                alt="OZOCO"
                className="h-10 w-auto object-contain"
              />

            </div>


            {/* HEADING */}
            <div className="mb-7">

              <p className="text-sm font-semibold text-orange-600 mb-2">
                CREATE ACCOUNT
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Get started with OZOCO
              </h2>

              <p className="mt-3 text-slate-500">
                Create your account to access citizen services and manage your requests.
              </p>

            </div>


            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* FULL NAME */}
              <div>

                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>


              {/* EMAIL */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>


             


              {/* PASSWORD */}
              <div>

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>


              {/* CONFIRM PASSWORD */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />

              </div>


              {/* TERMS */}
              <div className="flex items-start gap-2 pt-1">

                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 accent-orange-600"
                />

                <label
                  htmlFor="terms"
                  className="text-sm text-slate-500 leading-relaxed"
                >
                  I agree to the{" "}

                  <span className="font-medium text-orange-600">
                    Terms of Service
                  </span>{" "}

                  and{" "}

                  <span className="font-medium text-orange-600">
                    Privacy Policy
                  </span>
                  .
                </label>

              </div>


              {/* REGISTER BUTTON */}

              {error && (
  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
    {error}
  </p>
)}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-orange-600 text-white font-semibold shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
              >
             {loading ? "Creating Account..." : "Create Account →"}
              </button>

            </form>


            {/* LOGIN LINK */}
            <div className="mt-7 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-orange-600 hover:text-orange-700 transition"
                >
                  Sign in
                </Link>
              </p>

            </div>


            {/* SECURITY */}
            <div className="mt-7 pt-5 border-t border-slate-100">

              <p className="text-xs text-center text-slate-400">
                🔒 Your account information is protected with secure authentication.
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;