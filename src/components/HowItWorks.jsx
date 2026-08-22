const steps = [
  {
    number: "01",
    title: "Tell Us Your Problem",
    description:
      "Describe your civic issue or service requirement in simple words. You can submit your request quickly from one place.",
    icon: "📝",
  },
  {
    number: "02",
    title: "AI Understands & Routes",
    description:
      "OZOCO intelligently understands your request and helps route it to the appropriate department or service.",
    icon: "✨",
  },
  {
    number: "03",
    title: "Track & Get Resolution",
    description:
      "Track your request, receive updates and stay informed until your issue reaches a resolution.",
    icon: "✓",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 px-5 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Simple & Intelligent
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            How OZOCO
            <span className="text-orange-500"> Works</span>
          </h2>

          <p className="mt-5 text-slate-600 text-base sm:text-lg leading-relaxed">
            Getting help shouldn't be complicated. OZOCO makes the entire
            process simple, transparent and easy to track.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-px bg-orange-200" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Number / Icon */}
              <div className="relative mx-auto w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center text-3xl group-hover:bg-orange-500 group-hover:scale-105 transition-all duration-300">
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </span>

                {/* Step number */}
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-7 text-xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 max-w-sm mx-auto text-slate-600 leading-relaxed text-[15px]">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;