
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl min-h-[680px] bg-white rounded-[28px] shadow-xl overflow-hidden grid lg:grid-cols-2 border border-orange-100">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative overflow-hidden px-8 py-10 sm:px-12 lg:px-14 flex flex-col justify-between">

          {/* Background Image */}
          <img
            src="/Forgot-bg.jpg"
            alt="Account recovery"
            className="absolute inset-0 w-full h-full object-cover blur-[4px] scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950/60" />

          {/* Orange Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-transparent to-slate-950/50" />

          {/* LOGO */}
          <div className="relative z-10">
            <img
              src="/JanaMaan_logo.png"
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
              Account Recovery
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] text-white">
              Get back to your
              <br />

              <span className="text-orange-300">
                citizen services.
              </span>
            </h2>

            <p className="mt-6 text-slate-200 text-base sm:text-lg leading-relaxed max-w-lg">
              Forgot your password? Don't worry. Enter your registered
              email address and we'll help you securely regain access
              to your OZOCO account.
            </p>


            {/* FEATURES */}
            <div className="mt-8 space-y-5">

              {/* Secure */}
              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  🔐
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Secure Recovery
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Your account recovery process is protected and secure.
                  </p>
                </div>

              </div>


              {/* Email */}
              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  ✉️
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Quick Reset Link
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Receive a password reset link on your registered email.
                  </p>
                </div>

              </div>


              {/* Access */}
              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
                  ↩
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    Regain Access
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Create a new password and continue using OZOCO services.
                  </p>
                </div>

              </div>

            </div>
          </div>


          {/* FOOTER */}
          <div className="relative z-10 mt-10 flex items-center gap-6 text-xs text-slate-300">

            <span>Secure</span>

            <span className="w-1 h-1 rounded-full bg-orange-400" />

            <span>Private</span>

            <span className="w-1 h-1 rounded-full bg-orange-400" />

            <span>Reliable</span>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="lg:hidden mb-8">

              <img
                src="/JanaMaan_logo.png"
                alt="OZOCO"
                className="h-10 w-auto object-contain"
              />

            </div>


            {/* HEADING */}
            <div className="mb-8">

              <p className="text-sm font-semibold text-orange-600 mb-2">
                RESET PASSWORD
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Forgot your password?
              </h2>

              <p className="mt-3 text-slate-500 leading-relaxed">
                Enter the email address associated with your OZOCO account
                and we'll send you a secure reset link.
              </p>

            </div>


            {/* FORM */}
            <form className="space-y-5">

              {/* EMAIL */}
              <div>

                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ✉
                  </div>

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your registered email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />

                </div>
              </div>


              {/* RESET BUTTON */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-600 text-white font-semibold shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                Send Reset Link →
              </button>

            </form>


            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-7">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-sm text-slate-400">
                or
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>


            {/* BACK TO LOGIN */}
            <Link
              to="/login"
              className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              ← Back to Login
            </Link>


            {/* HELP MESSAGE */}
            <div className="mt-7 p-4 rounded-xl bg-[#FFF8F1] border border-orange-100">

              <p className="text-xs text-slate-500 leading-relaxed text-center">
                Didn't receive the email? Check your spam folder or
                make sure you entered the email associated with your account.
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

export default ForgotPassword;