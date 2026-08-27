import Navbar from "../components/Navbar";

const complaints = [
  {
    id: "OZO-1024",
    title: "Water supply issue",
    department: "Water Resources",
    service: "Water Supply",
    status: "In Progress",
    date: "27 Aug 2026",
  },
  {
    id: "OZO-1018",
    title: "Street light not working",
    department: "Municipal Services",
    service: "Street Lighting",
    status: "Resolved",
    date: "24 Aug 2026",
  },
  {
    id: "OZO-1009",
    title: "Road maintenance required",
    department: "Public Works",
    service: "Road Maintenance",
    status: "Submitted",
    date: "21 Aug 2026",
  },
];

const getStatusStyle = (status) => {
  if (status === "Resolved") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  if (status === "In Progress") {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }

  return "bg-blue-50 text-blue-700 border-blue-200";
};

const MyComplaints = () => {
  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <p className="text-sm font-semibold text-orange-600 mb-2">
              CITIZEN SERVICES
            </p>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  My Requests
                </h1>

                <p className="mt-3 text-slate-600 max-w-2xl">
                  Track your submitted complaints and stay updated on their
                  progress.
                </p>
              </div>

              <button
                type="button"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-200"
              >
                + New Complaint
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

            <div className="bg-[#FFFDF9] rounded-2xl border border-orange-200 p-5 shadow-md shadow-orange-900/5">
              <p className="text-sm text-slate-500">
                Total Requests
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                3
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-orange-200 p-5 shadow-md shadow-orange-900/5">
              <p className="text-sm text-slate-500">
                In Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600">
                1
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-orange-200 p-5 shadow-md shadow-orange-900/5">
              <p className="text-sm text-slate-500">
                Resolved
              </p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                1
              </p>
            </div>

          </div>

          {/* Complaint List */}
          <div className="space-y-5">

            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-md shadow-orange-900/10 p-6 sm:p-7 hover:shadow-xl hover:border-orange-300 transition-all duration-200"
              >

                {/* Complaint Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">

                      <span className="text-xs font-semibold text-orange-600">
                        #{complaint.id}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {complaint.title}
                    </h2>
                  </div>

                  <p className="text-sm text-slate-500">
                    {complaint.date}
                  </p>

                </div>

                {/* Complaint Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                  <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                    <p className="text-xs text-slate-500 mb-1">
                      Department
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {complaint.department}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#FFF8F1] border border-orange-100 p-4">
                    <p className="text-xs text-slate-500 mb-1">
                      Service
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {complaint.service}
                    </p>
                  </div>

                </div>

                {/* Progress */}
                <div className="mt-6">

                  <p className="text-xs font-semibold text-slate-500 mb-3">
                    REQUEST PROGRESS
                  </p>

                  <div className="flex items-center">

                    <div className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />

                    <div className="h-1 flex-1 bg-orange-200" />

                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        complaint.status === "Submitted"
                          ? "bg-slate-300"
                          : "bg-orange-500"
                      }`}
                    />

                    <div
                      className={`h-1 flex-1 ${
                        complaint.status === "Resolved"
                          ? "bg-orange-500"
                          : "bg-slate-200"
                      }`}
                    />

                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        complaint.status === "Resolved"
                          ? "bg-green-500"
                          : "bg-slate-300"
                      }`}
                    />

                  </div>

                  <div className="flex justify-between mt-2 text-[11px] text-slate-500">
                    <span>Submitted</span>
                    <span>Processing</span>
                    <span>Resolved</span>
                  </div>

                </div>

                {/* View Details */}
                <div className="mt-6 pt-5 border-t border-orange-100 flex justify-end">

                  <button
                    type="button"
                    className="text-sm font-semibold text-orange-600 hover:text-orange-700 hover:translate-x-0.5 transition-all duration-200"
                  >
                    View Details →
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>
      </main>
    </div>
  );
};

export default MyComplaints;