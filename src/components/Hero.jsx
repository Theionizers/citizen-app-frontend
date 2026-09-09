import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden sm:min-h-[680px] lg:min-h-[720px]">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/citizen-service.jpg')",
          backgroundPosition: "center center",
        }}
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div className="absolute inset-0 bg-slate-950/55" />

      {/* =====================================================
          ORANGE TINT
      ===================================================== */}

      <div className="absolute inset-0 bg-orange-950/10" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">

        <div className="max-w-2xl">

          {/* LABEL */}

          <p className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-600 shadow-sm sm:text-sm">
            AI-Powered Citizen Service Platform
          </p>

          {/* HEADING */}

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Your Voice.
            <br />
            Your Service.
            <br />

            <span className="text-orange-400">
              Your Solution.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Connect with the right government service, department
            and support through one intelligent citizen platform.
          </p>

          {/* BUTTONS */}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-700"
            >
              Get Started →
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center rounded-xl border border-white bg-white/95 px-7 py-3.5 font-semibold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              Track Request
            </Link>

          </div>

          {/* TRUST INDICATORS */}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span>✓ Secure</span>
            <span>✓ Transparent</span>
            <span>✓ Citizen-focused</span>
          </div>

        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFF8F1] to-transparent" />

    </section>
  );
};

export default Hero;