import Navbar from "../components/Navbar";

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
               {/* Attachments */}
            <div className="mb-7">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Attach Image or Document
                <span className="font-normal text-slate-400 ml-1">
                  (Optional)
                </span>
              </label>

              <label className="flex flex-col items-center justify-center min-h-36 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/40 hover:bg-orange-50 hover:border-orange-300 transition cursor-pointer">
                <span className="text-3xl mb-2">📎</span>

                <span className="text-sm font-semibold text-slate-700">
                  Upload an image or document
                </span>

                <span className="text-xs text-slate-500 mt-1">
                  JPG, PNG, PDF and supported documents
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
            </div>

            {/* Location */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Location
                <span className="font-normal text-slate-400 ml-1">
                  (Optional)
                </span>
              </label>

              <button
                type="button"
                className="w-full flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left hover:border-orange-300 hover:bg-orange-50/40 transition"
              >
                <span className="text-xl">📍</span>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Add your location
                  </p>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Helps us identify the appropriate jurisdiction
                  </p>
                </div>
              </button>
            </div>
             {/* Submit */}
            <button
              type="button"
              className="w-full rounded-2xl bg-orange-600 px-6 py-3.5 text-white font-semibold shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              Submit Complaint
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitComplaint;