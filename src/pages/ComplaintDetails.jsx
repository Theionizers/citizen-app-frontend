import Navbar from "../components/Navbar";

const ComplaintDetails = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Back */}
          <button
            type="button"
            className="mb-6 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
          >
            ← Back to My Requests
          </button>

          {/* Header Card */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

              <div>
                <p className="text-xs font-semibold text-orange-600 mb-2">
                  COMPLAINT #OZO-1024
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Water supply issue
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Submitted on 27 Aug 2026
                </p>
              </div>

              <span className="self-start px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold">
                In Progress
              </span>

            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Your Complaint
              </h2>

              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-5">
                <p className="text-sm leading-7 text-slate-600">
                  There has been no water supply in our area for the last three
                  days. Please look into the issue and restore the water supply
                  as soon as possible.
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-5">
                <p className="text-xs text-slate-500 mb-1">
                  Department
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Water Resources
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-5">
                <p className="text-xs text-slate-500 mb-1">
                  Service
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Water Supply
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-5">
                <p className="text-xs text-slate-500 mb-1">
                  Current Status
                </p>
                <p className="text-sm font-semibold text-orange-600">
                  In Progress
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-5">
                <p className="text-xs text-slate-500 mb-1">
                  Expected Resolution
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Within 3 working days
                </p>
              </div>

            </div>

          </div>

          {/* Progress Timeline */}
          <div className="mt-6 bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-6 sm:p-8">

            <h2 className="text-lg font-bold text-slate-900">
              Request Progress
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Follow the progress of your complaint.
            </p>

            <div className="mt-8 space-y-7">

              {/* Submitted */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="w-0.5 h-12 bg-orange-200 mt-1" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Submitted
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Complaint submitted successfully
                  </p>
                </div>
              </div>

              {/* Classified */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="w-0.5 h-12 bg-orange-200 mt-1" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Classified & Routed
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your complaint was assigned to the appropriate service
                    department.
                  </p>
                </div>
              </div>

              {/* Current */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-orange-600">
                    In Progress
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    The concerned department is currently working on your
                    request.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Location / Attachment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

            <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 p-6 shadow-md shadow-orange-900/5">
              <p className="text-xs font-semibold text-slate-500 mb-3">
                LOCATION
              </p>

              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Location provided
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Citizen-provided location
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 p-6 shadow-md shadow-orange-900/5">
              <p className="text-xs font-semibold text-slate-500 mb-3">
                ATTACHMENTS
              </p>

              <div className="flex items-center gap-3">
                <span className="text-xl">📎</span>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    No attachments
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    No files were attached to this request.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default ComplaintDetails;