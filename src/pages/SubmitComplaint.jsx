import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const SubmitComplaint = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [locationAdded, setLocationAdded] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setError("Please describe your problem before submitting.");
      return;
    }

    if (trimmedDescription.length > 1000) {
      setError("Complaint description cannot exceed 1000 characters.");
      return;
    }

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_BASE_URL}/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: trimmedDescription,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail || "Failed to submit complaint."
        );
      }

      setSuccess("Your complaint has been submitted successfully.");

      // Give the user a moment to see success message
      setTimeout(() => {
        navigate("/my-complaints");
      }, 1000);
    } catch (err) {
      console.error("Complaint submission error:", err);

      setError(
        err.message || "Something went wrong while submitting your complaint."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="pt-32 pb-16 px-5 sm:px-8 lg:px-10">
        <div className="max-w-5xl mx-auto">

          {/* Page Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              CITIZEN SERVICES
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              Submit Your Complaint
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-7">
              Tell us about the problem you're facing. Provide the details
              below and we'll help route your request to the right department.
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-orange-200 shadow-xl shadow-orange-900/10 overflow-hidden">

            {/* Card Header */}
            <div className="px-6 sm:px-8 py-6 border-b border-orange-100 bg-gradient-to-r from-orange-50/70 to-transparent">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-900/20">
                  <span className="text-lg">✦</span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Tell us what happened
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    You can describe your issue by typing or using your voice.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">

              {/* Description */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-semibold text-slate-800"
                  >
                    Describe your problem
                  </label>

                  <span className="text-xs text-slate-400">
                    Required
                  </span>
                </div>

                <textarea
                  id="description"
                  rows="7"
                  maxLength={1000}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                  placeholder="Explain your problem in your own words..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 outline-none resize-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                />

                <div className="flex justify-between mt-2">
                  <p className="text-xs text-slate-500">
                    Please provide enough details so we can understand your
                    issue.
                  </p>

                  <span className="text-xs text-slate-400">
                    {description.length} / 1000
                  </span>
                </div>
              </div>

              {/* Voice Input */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Describe with Voice
                  </label>

                  <span className="text-xs text-slate-400">
                    Optional
                  </span>
                </div>

                <div
                  className={`rounded-2xl border p-5 transition-all duration-200 ${isRecording
                      ? "border-orange-400 bg-orange-50"
                      : "border-orange-200 bg-orange-50/40"
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition ${isRecording
                            ? "bg-orange-600 text-white shadow-md shadow-orange-900/20"
                            : "bg-white text-orange-600 border border-orange-100"
                          }`}
                      >
                        <span className="text-xl">🎤</span>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {isRecording
                            ? "Listening..."
                            : "Tell us your problem"}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {isRecording
                            ? "Speak clearly and tap stop when finished."
                            : "Voice submission will be connected when the backend voice API is available."}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isRecording
                          ? "bg-slate-800 text-white hover:bg-slate-900"
                          : "bg-orange-600 text-white hover:bg-orange-700 hover:-translate-y-0.5 shadow-md shadow-orange-900/20"
                        }`}
                    >
                      {isRecording
                        ? "Stop Recording"
                        : "Start Recording"}
                    </button>
                  </div>

                  {isRecording && (
                    <div className="flex items-center gap-1 mt-5 pt-4 border-t border-orange-200">
                      <span className="w-1 h-3 bg-orange-400 rounded-full animate-pulse" />
                      <span className="w-1 h-5 bg-orange-500 rounded-full animate-pulse" />
                      <span className="w-1 h-8 bg-orange-600 rounded-full animate-pulse" />
                      <span className="w-1 h-5 bg-orange-500 rounded-full animate-pulse" />
                      <span className="w-1 h-3 bg-orange-400 rounded-full animate-pulse" />

                      <span className="text-xs font-medium text-orange-700 ml-2">
                        Recording in progress
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachment */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Attach Image or Document
                  </label>

                  <span className="text-xs text-slate-400">
                    Optional
                  </span>
                </div>

                {!selectedFile ? (
                  <label className="group flex flex-col items-center justify-center min-h-40 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/30 hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 cursor-pointer">

                    <div className="w-12 h-12 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-105 transition-transform">
                      <span className="text-xl">📎</span>
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload a file
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      JPG, PNG, PDF, DOC or DOCX
                    </p>

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-orange-200 bg-orange-50/50 p-4">

                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                        📄
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {selectedFile.name}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-sm font-semibold text-red-500 hover:text-red-600 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  File upload will be connected when the backend provides a
                  complaint attachment endpoint.
                </p>
              </div>

              {/* Location */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-800">
                    Location
                  </label>

                  <span className="text-xs text-slate-400">
                    Optional
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLocationAdded(!locationAdded)}
                  className={`w-full flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${locationAdded
                      ? "border-orange-400 bg-orange-50"
                      : "border-slate-200 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/40"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      📍
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {locationAdded
                          ? "Location added"
                          : "Add your location"}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {locationAdded
                          ? "Location UI selected. Backend location API is not connected yet."
                          : "Helps us identify the appropriate jurisdiction."}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-orange-600 shrink-0">
                    {locationAdded ? "Added ✓" : "Add"}
                  </span>
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-sm font-medium text-green-700">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit Area */}
              <div className="pt-6 border-t border-orange-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Ready to submit?
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Your request will be reviewed and routed to the
                      appropriate department.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-7 py-3.5 rounded-xl text-white text-sm font-semibold shadow-lg transition-all duration-200 ${isSubmitting
                        ? "bg-orange-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-700 hover:-translate-y-0.5 shadow-orange-900/20"
                      }`}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Complaint →"}
                  </button>

                </div>
              </div>

            </div>
          </div>

          {/* Trust Note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="text-green-600">✓</span>
            Your complaint details will be handled securely.
          </div>

        </div>
      </main>
    </div>
  );
};

export default SubmitComplaint;