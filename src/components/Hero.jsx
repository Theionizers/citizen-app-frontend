import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[680px] flex items-center overflow-hidden">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/citizen-service.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/55" />

      {/* Orange tint */}
      <div className="absolute inset-0 bg-orange-950/10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Label */}
          <p className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 text-orange-600 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm">
            AI-Powered Citizen Service Platform
          </p>

          {/* Heading */}
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-white">
            Your Voice.
            <br />
            Your Service.
            <br />
            <span className="text-orange-400">
              Your Solution.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">
            Connect with the right government service, department and
            support through one intelligent citizen platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-orange-600 text-white font-semibold shadow-lg shadow-orange-900/25 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started →
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white/95 text-slate-900 font-semibold border border-white hover:bg-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Track Request
            </Link>
          </div>

          {/* Small trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span>✓ Secure</span>
            <span>✓ Transparent</span>
            <span>✓ Citizen-focused</span>
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFF8F1] to-transparent" />
    </section>
  );
};

export default Hero;