const services = [
  {
    title: "Report a Problem",
    description:
      "Report civic issues and problems in your area quickly and easily.",
    icon: "📝",
  },
  {
    title: "Track Your Request",
    description:
      "Track the progress of your submitted complaints and service requests.",
    icon: "📍",
  },
  {
    title: "Public Services",
    description:
      "Find and access important government and public services from one place.",
    icon: "🏛️",
  },
  {
    title: "AI Assistance",
    description:
      "Get intelligent assistance to understand and resolve your civic needs.",
    icon: "✨",
  },
  {
    title: "Submit Documents",
    description:
      "Upload the required documents securely while submitting your request.",
    icon: "📄",
  },
  {
    title: "Get Updates",
    description:
      "Receive updates about your requests and stay informed at every step.",
    icon: "🔔",
  },
];

const Services = () => {
  return (
    <section className="bg-[#FFF8F1] py-20 px-5 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm mb-3">
            Our Services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Everything You Need,
            <span className="text-orange-500"> In One Place</span>
          </h2>

          <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            OZOCO makes it easier to report problems, access public services,
            track requests and get the assistance you need.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-7 border border-orange-100
                         shadow-sm hover:shadow-xl hover:-translate-y-2
                         transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl bg-orange-50
                           flex items-center justify-center text-2xl
                           group-hover:bg-orange-500
                           transition-colors duration-300"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 text-orange-500 font-semibold flex items-center gap-2">
                Explore
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