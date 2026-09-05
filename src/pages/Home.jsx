import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1] text-slate-900">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= SERVICES ================= */}
      <section id="services">
        <Services />
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="mx-auto mb-12 max-w-3xl text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-orange-600">
              Why OZOCO
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              A simpler way to raise civic requests
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              OZOCO brings complaint submission, AI-powered
              service identification, department routing and
              request tracking together in one platform.
            </p>

          </div>

          {/* Feature Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* Feature 1 */}
            <div className="rounded-2xl border border-orange-200 bg-orange-100 p-6 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-200 text-xl text-orange-700">
                📝
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Easy Submission
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Describe your civic problem clearly and submit
                your request through a simple interface.
              </p>

            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-blue-200 bg-blue-100 p-6 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-200 text-xl text-blue-700">
                ✨
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                AI-Powered Understanding
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                AI helps understand your request and identify
                the appropriate service and department.
              </p>

            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-green-200 bg-green-100 p-6 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-200 text-xl text-green-700">
                📍
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Smart Routing
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Requests are routed toward the appropriate
                department so they can reach the right team.
              </p>

            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-purple-200 bg-purple-100 p-6 shadow-[0_6px_24px_rgba(90,60,30,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-200 text-xl text-purple-700">
                🔎
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Track Progress
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep track of your request as it moves through
                the complaint resolution process.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUST / PROCESS STRIP ================= */}
      <section className="px-5 pb-20 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-[0_8px_30px_rgba(90,60,30,0.05)]">

            <div className="grid md:grid-cols-3">

              <div className="border-b border-orange-100 px-6 py-7 md:border-b-0 md:border-r">
                <p className="text-sm font-bold text-slate-900">
                  Secure
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Your account and complaint information
                  is handled through authenticated access.
                </p>
              </div>

              <div className="border-b border-orange-100 px-6 py-7 md:border-b-0 md:border-r">
                <p className="text-sm font-bold text-slate-900">
                  Transparent
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Stay informed about your complaint and
                  its progress throughout the process.
                </p>
              </div>

              <div className="px-6 py-7">
                <p className="text-sm font-bold text-slate-900">
                  Citizen-focused
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Designed to make civic service requests
                  easier to submit and follow.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section
        className="px-5 pb-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-6xl">

          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center shadow-xl sm:px-10 lg:px-16">

            {/* Decorative Background */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="relative z-10">

              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                Get Started
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Have a civic problem?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Submit your request through OZOCO and track
                its progress from submission to resolution.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  to="/submit-complaint"
                  className="rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700"
                >
                  Submit a Complaint →
                </Link>

                <Link
                  to="/my-complaints"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                >
                  Track My Requests
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-orange-100 bg-[#FFFDF9]">

        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

            {/* Brand */}
            <div className="max-w-sm">

              <img
                src="/ozoco-logo.png"
                alt="OZOCO"
                className="h-10 w-auto object-contain"
              />

              <p className="mt-3 text-sm leading-6 text-slate-500">
                AI-powered citizen service platform for
                simpler complaint submission, intelligent
                routing and transparent request tracking.
              </p>

            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">

              <div>
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Platform
                </p>

                <div className="space-y-2 text-sm text-slate-500">

                  <a
                    href="#services"
                    className="block transition hover:text-orange-600"
                  >
                    Services
                  </a>

                  <a
                    href="#how-it-works"
                    className="block transition hover:text-orange-600"
                  >
                    How It Works
                  </a>

                  <a
                    href="#features"
                    className="block transition hover:text-orange-600"
                  >
                    Features
                  </a>

                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Citizen
                </p>

                <div className="space-y-2 text-sm text-slate-500">

                  <Link
                    to="/submit-complaint"
                    className="block transition hover:text-orange-600"
                  >
                    Submit Complaint
                  </Link>

                  <Link
                    to="/my-complaints"
                    className="block transition hover:text-orange-600"
                  >
                    My Requests
                  </Link>

                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Account
                </p>

                <div className="space-y-2 text-sm text-slate-500">

                  <Link
                    to="/login"
                    className="block transition hover:text-orange-600"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="block transition hover:text-orange-600"
                  >
                    Register
                  </Link>

                </div>
              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col gap-3 border-t border-orange-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} OZOCO. All rights reserved.
            </p>

            <p>
              AI Citizen Service Platform
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;