const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-xl">
              C
            </div>

            <div>
              <h1 className="font-bold text-lg tracking-wide">
                Citizen App
              </h1>

              <p className="text-xs text-slate-500">
                Digital Citizen Services
              </p>
            </div>

          </div>


          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <a
              href="#services"
              className="text-sm font-medium text-slate-600 hover:text-blue-800 transition"
            >
              Services
            </a>

            <a
              href="#announcements"
              className="text-sm font-medium text-slate-600 hover:text-blue-800 transition"
            >
              Announcements
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 hover:text-blue-800 transition"
            >
              About
            </a>

          </div>


          {/* Login / Profile */}
          <div className="flex items-center gap-3">

            <button className="hidden sm:block text-sm font-semibold text-blue-800 hover:text-blue-950">
              Login
            </button>

            <button className="px-5 py-2.5 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 transition">
              Get Started
            </button>

          </div>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-400/10"></div>

        <div className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-300/10"></div>


        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">

          <div className="max-w-3xl">

            <p className="text-blue-200 uppercase tracking-[0.2em] text-sm font-semibold mb-5">
              Welcome to Citizen App
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Government services,
              <br />
              <span className="text-blue-200">
                made simpler.
              </span>
            </h2>

            <p className="mt-6 text-lg text-blue-100 leading-relaxed max-w-2xl">
              Access essential citizen services, submit requests,
              track applications, and stay updated through one
              secure digital platform.
            </p>


            {/* CTA */}
            <div className="mt-9 flex flex-wrap gap-4">

              <button className="px-6 py-3.5 rounded-xl bg-white text-blue-900 font-semibold shadow-lg hover:-translate-y-0.5 transition">
                Explore Services
              </button>

              <button className="px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition">
                Track Request
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK ACCESS ================= */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-xl font-bold">
              S
            </div>

            <h3 className="mt-4 font-bold text-lg">
              Apply for Services
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Submit applications for available citizen services.
            </p>
          </div>


          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-xl font-bold">
              T
            </div>

            <h3 className="mt-4 font-bold text-lg">
              Track Request
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check the status of your submitted requests.
            </p>
          </div>


          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-xl font-bold">
              H
            </div>

            <h3 className="mt-4 font-bold text-lg">
              Help & Support
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Get assistance with citizen services and requests.
            </p>
          </div>


          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center text-xl font-bold">
              A
            </div>

            <h3 className="mt-4 font-bold text-lg">
              My Applications
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View and manage your applications in one place.
            </p>
          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-2xl mb-12">

          <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
            Citizen Services
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
            Everything you need in one place
          </h2>

          <p className="mt-4 text-slate-500">
            Access important public services quickly and conveniently
            from a single digital platform.
          </p>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              title: "Birth Certificate",
              description: "Apply for and manage birth certificate services.",
            },
            {
              title: "Income Certificate",
              description: "Submit applications for income certification.",
            },
            {
              title: "Residence Certificate",
              description: "Apply for official residence documentation.",
            },
            {
              title: "Grievance Management",
              description: "Submit complaints and track their resolution.",
            },
            {
              title: "Document Services",
              description: "Access and manage important citizen documents.",
            },
            {
              title: "Public Information",
              description: "Stay informed about government announcements.",
            },
          ].map((service) => (

            <div
              key={service.title}
              className="bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                C
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {service.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {service.description}
              </p>

              <button className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900">
                Learn more →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ================= ANNOUNCEMENTS ================= */}
      <section
        id="announcements"
        className="bg-white border-y border-slate-200"
      >

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

            <div>

              <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">
                Latest Updates
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Announcements
              </h2>

            </div>

            <button className="text-sm font-semibold text-blue-700">
              View all updates →
            </button>

          </div>


          <div className="space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">

              <div>
                <h3 className="font-semibold">
                  Citizen service portal updates
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  New digital services are now available.
                </p>
              </div>

              <span className="text-xs font-medium text-slate-400">
                AUG 2026
              </span>

            </div>


            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">

              <div>
                <h3 className="font-semibold">
                  Scheduled maintenance notice
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Some services may be temporarily unavailable.
                </p>
              </div>

              <span className="text-xs font-medium text-slate-400">
                AUG 2026
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer id="about" className="bg-slate-950 text-slate-300">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid md:grid-cols-3 gap-10">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold">
                  C
                </div>

                <div>
                  <h3 className="text-white font-bold">
                    Citizen App
                  </h3>

                  <p className="text-xs text-slate-500">
                    Digital Citizen Services
                  </p>
                </div>

              </div>

              <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
                A unified digital platform designed to make
                citizen services simpler, faster, and more accessible.
              </p>

            </div>


            <div>

              <h4 className="text-white font-semibold mb-4">
                Quick Links
              </h4>

              <div className="space-y-3 text-sm">

                <p className="hover:text-white cursor-pointer">
                  Services
                </p>

                <p className="hover:text-white cursor-pointer">
                  Announcements
                </p>

                <p className="hover:text-white cursor-pointer">
                  Help & Support
                </p>

              </div>

            </div>


            <div>

              <h4 className="text-white font-semibold mb-4">
                Contact
              </h4>

              <p className="text-sm text-slate-400">
                Need help with a citizen service?
              </p>

              <p className="mt-3 text-sm text-blue-400">
                support@citizenapp.gov
              </p>

            </div>

          </div>


          <div className="mt-12 pt-6 border-t border-slate-800 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-3">

            <p>
              © 2026 Citizen App. All rights reserved.
            </p>

            <p>
              Secure • Simple • Transparent
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Home;