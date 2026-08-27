const SubmitComplaint = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">

     {/* Page Header */}
          <div className="mb-10">
            <p className="text-sm font-semibold text-orange-600 mb-2">
              CITIZEN SERVICES
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Submit Your Complaint
            </h1>

            <p className="mt-3 text-slate-600 max-w-2xl">
              Tell us about the problem you're facing. We'll help identify
              the right service and department for your request.
            </p>
          </div>
  {/* Complaint Form */}
          <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-900/5 p-6 sm:p-8">

            {/* Description */}
            <div className="mb-7">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-800 mb-2"
              >
                Describe your problem
              </label>

              <textarea
                id="description"
                rows="7"
                placeholder="Explain your problem in your own words..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition"
              />

              <p className="mt-2 text-xs text-slate-500">
                Please provide enough details so we can understand your issue.
              </p>
            </div>