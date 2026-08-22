const services = [
  {
    title: "Report a Problem",
    description:
      "Raise civic issues in seconds and make sure your concern reaches the right authority.",
    icon: "📝",
  },
  {
    title: "Track Your Request",
    description:
      "Stay updated and follow the progress of your complaint from submission to resolution.",
    icon: "📍",
  },
  {
    title: "Public Services",
    description:
      "Discover essential government and civic services available for your everyday needs.",
    icon: "🏛️",
  },
  {
    title: "AI Assistance",
    description:
      "Get intelligent guidance to understand your problem and find the right service.",
    icon: "✨",
  },
  {
    title: "Submit Documents",
    description:
      "Upload supporting documents securely while submitting your request or complaint.",
    icon: "📄",
  },
  {
    title: "Get Updates",
    description:
      "Receive timely updates and notifications about the progress of your requests.",
    icon: "🔔",
  },
];

const Services = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F1] py-24 px-5 sm:px-8 lg:px-10">
      
      {/* Decorative background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-orange-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            What OZOCO Offers
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Everything You Need,
            <span className="block text-orange-500 mt-2">
              All in One Place
            </span>
          </h2>

          <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From reporting civic problems to tracking your requests,
            OZOCO brings essential citizen services together in one simple
            and intelligent platform.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white/90 backdrop-blur-sm
                         rounded-3xl p-7
                         border border-orange-100
                         shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                         hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]
                         hover:-translate-y-2
                         transition-all duration-300"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8 h-[3px]
                              bg-orange-500 scale-x-0
                              group-hover:scale-x-100
                              origin-left rounded-full
                              transition-transform duration-300" />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl
                           bg-orange-50
                           flex items-center justify-center
                           text-2xl
                           group-hover:bg-orange-500
                           group-hover:scale-105
                           transition-all duration-300"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed text-[15px]">
                {service.description}
              </p>

              {/* Explore */}
              <div className="mt-6 flex items-center gap-2 text-orange-500 font-semibold text-sm">
                Explore service
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;