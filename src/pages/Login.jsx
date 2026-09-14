import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getCurrentUser, loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("access_token", data.access_token);

      const user = await getCurrentUser(data.access_token);

      localStorage.setItem("user", JSON.stringify(user));


      if (user.role === "admin") {
        navigate("/admin-welcome");
      } else if (user.role === "officer") {
        navigate("/officer-welcome");
      } else {
        navigate("/");
      }
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
            src="/login-bg.jpg"
            alt="Citizen services"
            className="absolute inset-0 w-full h-full object-cover blur-[3px] scale-105"
          />

          {/* Dark / Orange Overlay */}
          <div className="absolute inset-0 bg-slate-950/60" />

          {/* Subtle Orange Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-transparent to-slate-950/50" />

          {/* HEADER */}
          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/JanaMaan_logo.png"
              alt="OZOCO"
              className="h-15 w-auto object-contain"
            />
          </div>

          {/* MAIN CONTENT */}
          <div className="relative z-10 max-w-xl mt-12 lg:mt-0">

            <p className="text-sm font-semibold text-orange-300 uppercase tracking-wider mb-4">
              Citizen Service Platform
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-white">
              Resolve issues.
              <br />
              <span className="text-orange-300">
                Track progress.
              </span>
              <br />
              Stay informed.
            </h2>

            <p className="mt-6 text-slate-200 text-base sm:text-lg leading-relaxed max-w-lg">
              Submit your civic problem through one digital platform.
              Get guided to the right service and track your request
              from submission to resolution.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">

              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-orange-300">
                  📝
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Submit a Problem
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Describe your issue and submit supporting documents or images.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-orange-300">
                  ✨
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    AI-Powered Classification
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Your request is analysed to identify the appropriate service.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-orange-300">
                  🔎
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Track Your Request
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Follow your ticket and stay updated throughout the process.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM */}
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

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <img
                src="/JanaMaan_logo.png"
                alt="OZOCO"
                className="h-10 w-auto object-contain"
              />

              <div>
                <h1 className="font-bold text-lg text-slate-900">
                  OZOCO
                </h1>

                <p className="text-xs text-slate-500">
                  AI Citizen Service Platform
                </p>
              </div>
            </div>


            {/* HEADING */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-orange-600 mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Sign in to continue
              </h2>

              <p className="mt-3 text-slate-500">
                Access your citizen services and track your requests.
              </p>
            </div>


            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>


              {/* PASSWORD */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                />
              </div>


              {/* REMEMBER */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 accent-orange-600"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600"
                >
                  Remember me
                </label>
              </div>


              {/* LOGIN */}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-orange-600 text-white font-semibold shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in →"}
              </button>

            </form>


            {/* REGISTER */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-orange-600 hover:text-orange-700"
                >
                  Create an account
                </Link>
              </p>
            </div>


            {/* SECURITY */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs text-center text-slate-400">
                🔒 Your account and submitted information are protected.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;