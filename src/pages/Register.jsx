import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE - COMPANY BRANDING */}
        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 p-12 text-white flex-col justify-between">

          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-400/20"></div>
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-blue-300/10"></div>

          {/* Logo / Company */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-xl font-bold">C</span>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-wide">
                  Citizen App
                </h1>

                <p className="text-xs text-blue-200">
                  Digital Citizen Services
                </p>
              </div>

            </div>
          </div>

          {/* Main branding */}
          <div className="relative z-10 max-w-lg">

            <p className="text-blue-200 uppercase tracking-[0.2em] text-sm font-semibold mb-5">
              Join Citizen App
            </p>

            <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              One Account.
              <br />
              Better Services.
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
              Create your account and access essential citizen
              services through one simple digital platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">
                Secure
              </div>

              <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">
                Simple
              </div>

              <div className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm">
                Transparent
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="relative z-10 text-sm text-blue-200">
            © 2026 Citizen App. All rights reserved.
          </div>

        </div>


        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">

              <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
                C
              </div>

              <div>
                <h1 className="font-bold text-lg text-slate-900">
                  Citizen App
                </h1>

                <p className="text-xs text-slate-500">
                  Digital Citizen Services
                </p>
              </div>

            </div>


            {/* Heading */}
            <div className="mb-8">

              <p className="text-sm font-semibold text-blue-700 mb-2">
                CREATE ACCOUNT
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Get started
              </h2>

              <p className="mt-3 text-slate-500">
                Create your account to access citizen services.
              </p>

            </div>


            {/* Form */}
            <form className="space-y-5">

              {/* Full Name */}
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
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                />

              </div>


              {/* Email / Mobile */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email or Mobile Number
                </label>

                <input
                  id="email"
                  type="text"
                  placeholder="Enter your email or mobile number"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                />

              </div>


              {/* Password */}
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
                  placeholder="Create a password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                />

              </div>


              {/* Confirm Password */}
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
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                />

              </div>


              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-800 text-white font-semibold shadow-lg shadow-blue-800/20 hover:bg-blue-900 hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Account
              </button>

            </form>


            {/* Login */}
            <div className="mt-8 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?{" "}
                <Link
  to="/login"
  className="font-semibold text-blue-700 hover:text-blue-900 transition"
>
  Login
</Link>
              </p>

            </div>


            {/* Security message */}
            <div className="mt-8 pt-6 border-t border-slate-100">

              <p className="text-xs text-center text-slate-400">
                Your information is protected with secure authentication.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;