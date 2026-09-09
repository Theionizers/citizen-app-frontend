import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

const SubmitComplaint = () => {
  const navigate = useNavigate();

  // ================= DESCRIPTION =================
  const [description, setDescription] = useState("");

  // ================= VOICE =================
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] =
    useState(false);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);

  // ================= IMAGE =================
  const [selectedImage, setSelectedImage] =
    useState(null);

  const imageInputRef = useRef(null);

  // ================= LOCATION =================
  const [locationAdded, setLocationAdded] =
    useState(false);
  const [locationLoading, setLocationLoading] =
    useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationError, setLocationError] =
    useState("");

  // ================= SUBMIT =================
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // START RECORDING
  // =========================================================

  const startRecording = async () => {
    try {
      setError("");
      setSuccess("");

      if (!navigator.mediaDevices?.getUserMedia) {
        setError(
          "Audio recording is not supported by this browser."
        );
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      let options = {};

      if (
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported(
          "audio/webm;codecs=opus"
        )
      ) {
        options = {
          mimeType: "audio/webm;codecs=opus",
        };
      } else if (
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported("audio/webm")
      ) {
        options = {
          mimeType: "audio/webm",
        };
      }

      const recorder = new MediaRecorder(
        stream,
        options
      );

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const mimeType =
          recorder.mimeType || "audio/webm";

        const audioBlob = new Blob(
          audioChunksRef.current,
          {
            type: mimeType,
          }
        );

        stream.getTracks().forEach((track) => {
          track.stop();
        });

        mediaStreamRef.current = null;

        await transcribeAudio(audioBlob);
      };

      recorder.start();

      setIsRecording(true);
    } catch (err) {
      console.error(
        "Failed to start recording:",
        err
      );

      if (err?.name === "NotAllowedError") {
        setError(
          "Microphone permission was denied. Please allow microphone access."
        );
      } else if (err?.name === "NotFoundError") {
        setError(
          "No microphone was found on this device."
        );
      } else {
        setError(
          "Unable to start recording. Please try again."
        );
      }

      setIsRecording(false);
    }
  };

  // =========================================================
  // STOP RECORDING
  // =========================================================

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) {
      return;
    }

    if (recorder.state !== "inactive") {
      recorder.stop();
    }

    setIsRecording(false);
    setIsTranscribing(true);
  };

  // =========================================================
  // TRANSCRIBE AUDIO
  // =========================================================

  const transcribeAudio = async (audioBlob) => {
    try {
      setError("");
      setSuccess("");

      const token =
        localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const extension =
        audioBlob.type.includes("webm")
          ? "webm"
          : "wav";

      const audioFile = new File(
        [audioBlob],
        `complaint-audio.${extension}`,
        {
          type:
            audioBlob.type || "audio/webm",
        }
      );

      const formData = new FormData();

      formData.append("audio", audioFile);

      const response = await fetch(
        `${API_BASE_URL}/complaints/transcribe`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Failed to transcribe audio."
        );
      }

      let transcript = "";

      if (typeof data === "string") {
        transcript = data;
      } else if (data?.text) {
        transcript = data.text;
      } else if (data?.transcript) {
        transcript = data.transcript;
      } else if (data?.transcription) {
        transcript = data.transcription;
      }

      transcript = String(
        transcript || ""
      ).trim();

      if (!transcript) {
        throw new Error(
          "No text was returned from the transcription service."
        );
      }

      setDescription((previous) => {
        if (!previous.trim()) {
          return transcript;
        }

        return `${previous.trim()} ${transcript}`;
      });

      setSuccess(
        "Voice converted to text successfully."
      );
    } catch (err) {
      console.error(
        "Transcription error:",
        err
      );

      setError(
        err.message ||
          "Unable to convert your voice to text."
      );
    } finally {
      setIsTranscribing(false);
      audioChunksRef.current = [];
    }
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select an image file."
      );

      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // =========================================================
  // LOCATION
  // =========================================================

  const handleAddLocation = () => {
    setLocationError("");
    setError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude =
          position.coords.latitude;

        const currentLongitude =
          position.coords.longitude;

        setLatitude(currentLatitude);
        setLongitude(currentLongitude);

        setLocationAdded(true);
        setLocationLoading(false);
        setLocationError("");
      },
      (geoError) => {
        console.error(
          "Location error:",
          geoError
        );

        setLocationLoading(false);
        setLocationAdded(false);

        if (geoError.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (geoError.code === 2) {
          setLocationError(
            "Your location could not be determined. Please try again."
          );
        } else if (geoError.code === 3) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to get your location. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const removeLocation = () => {
    setLatitude(null);
    setLongitude(null);
    setLocationAdded(false);
    setLocationError("");
  };

  // =========================================================
  // SUBMIT COMPLAINT
  // =========================================================

  const handleSubmit = async () => {
    const trimmedDescription =
      description.trim();

    if (!trimmedDescription) {
      setError(
        "Please describe your problem before submitting."
      );
      return;
    }

    if (trimmedDescription.length > 1000) {
      setError(
        "Complaint description cannot exceed 1000 characters."
      );
      return;
    }

    const token =
      localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");

      /*
        IMPORTANT:
        Current backend /complaints endpoint accepts JSON.
        Therefore selectedImage is intentionally NOT sent yet.

        Once backend attachment API is available,
        selectedImage can be sent through multipart/form-data
        without changing this UI.
      */

      const response = await fetch(
        `${API_BASE_URL}/complaints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            description:
              trimmedDescription,
            latitude,
            longitude,
          }),
        }
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
            "Failed to submit complaint."
        );
      }

      setSuccess(
        selectedImage
          ? "Complaint submitted. Image is saved in the form and will be connected to backend attachment handling once the API is available."
          : "Your complaint has been submitted successfully."
      );

      setTimeout(() => {
        navigate("/my-complaints");
      }, 1200);
    } catch (err) {
      console.error(
        "Complaint submission error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong while submitting your complaint."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1]">
      <Navbar />

      <main className="px-5 pb-16 pt-32 sm:px-8 lg:px-10">

        <div className="mx-auto max-w-5xl">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-10">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">

              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

              CITIZEN SERVICES

            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Submit Your Complaint
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Tell us about the problem you're facing.
              Provide the details below and we'll help
              route your request to the right department.
            </p>

          </div>

          {/* =================================================
              MAIN CARD
          ================================================= */}

          <div className="overflow-hidden rounded-3xl border border-orange-200 bg-[#FFFDF9] shadow-xl shadow-orange-900/10">

            {/* CARD HEADER */}

            <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50/70 to-transparent px-6 py-6 sm:px-8">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-900/20">
                  <span className="text-lg">
                    ✦
                  </span>
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Tell us what happened
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    You can describe your issue by
                    typing or using your voice.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6 sm:p-8">

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="mb-8">

                <div className="mb-2 flex items-center justify-between">

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
                    setDescription(
                      e.target.value
                    );
                    setError("");
                  }}
                  placeholder="Explain your problem in your own words..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:text-base"
                />

                <div className="mt-2 flex justify-between gap-4">

                  <p className="text-xs text-slate-500">
                    Please provide enough details so
                    we can understand your issue.
                  </p>

                  <span className="shrink-0 text-xs text-slate-400">
                    {description.length} / 1000
                  </span>

                </div>

              </div>

              {/* =================================================
                  VOICE
              ================================================= */}

              <div className="mb-8">

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-semibold text-slate-800">
                    Describe with Voice
                  </label>

                  <span className="text-xs text-slate-400">
                    Optional
                  </span>

                </div>

                <div
                  className={`rounded-2xl border p-5 transition-all duration-200 ${
                    isRecording
                      ? "border-orange-400 bg-orange-50"
                      : isTranscribing
                      ? "border-blue-300 bg-blue-50"
                      : "border-orange-200 bg-orange-50/40"
                  }`}
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                          isRecording
                            ? "bg-orange-600 text-white shadow-md shadow-orange-900/20"
                            : isTranscribing
                            ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                            : "border border-orange-100 bg-white text-orange-600"
                        }`}
                      >
                        <span className="text-xl">
                          🎤
                        </span>
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">

                          {isRecording
                            ? "Listening..."
                            : isTranscribing
                            ? "Converting voice to text..."
                            : "Tell us your problem"}

                        </p>

                        <p className="mt-1 text-xs text-slate-500">

                          {isRecording
                            ? "Speak clearly and tap stop when finished."
                            : isTranscribing
                            ? "Please wait while your voice is being transcribed."
                            : "Your voice will be converted into text and placed in the complaint description."}

                        </p>

                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={
                        isRecording
                          ? stopRecording
                          : startRecording
                      }
                      disabled={isTranscribing}
                      className={`w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 sm:w-auto ${
                        isRecording
                          ? "bg-slate-800 text-white hover:bg-slate-900"
                          : isTranscribing
                          ? "cursor-not-allowed bg-blue-400 text-white"
                          : "bg-orange-600 text-white shadow-md shadow-orange-900/20 hover:-translate-y-0.5 hover:bg-orange-700"
                      }`}
                    >

                      {isRecording
                        ? "Stop Recording"
                        : isTranscribing
                        ? "Transcribing..."
                        : "Start Recording"}

                    </button>

                  </div>

                  {isRecording && (
                    <div className="mt-5 flex items-center gap-1 border-t border-orange-200 pt-4">

                      <span className="h-3 w-1 animate-pulse rounded-full bg-orange-400" />
                      <span className="h-5 w-1 animate-pulse rounded-full bg-orange-500" />
                      <span className="h-8 w-1 animate-pulse rounded-full bg-orange-600" />
                      <span className="h-5 w-1 animate-pulse rounded-full bg-orange-500" />
                      <span className="h-3 w-1 animate-pulse rounded-full bg-orange-400" />

                      <span className="ml-2 text-xs font-medium text-orange-700">
                        Recording in progress
                      </span>

                    </div>
                  )}

                  {isTranscribing && (
                    <div className="mt-5 border-t border-blue-200 pt-4">

                      <div className="flex items-center gap-2">

                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-600" />

                        <span className="text-xs font-medium text-blue-700">
                          Sending audio to transcription service...
                        </span>

                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* =================================================
                  IMAGE UPLOAD
              ================================================= */}

              <div className="mb-8">

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-semibold text-slate-800">
                    Supporting Image
                  </label>

                  <span className="text-xs text-slate-400">
                    Optional
                  </span>

                </div>

                {!selectedImage ? (
                  <label
                    htmlFor="complaint-image"
                    className="group flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/30 px-5 py-8 text-center transition-all duration-200 hover:border-orange-400 hover:bg-orange-50"
                  >

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-100 bg-white text-xl text-orange-600 transition-transform duration-200 group-hover:scale-105">
                      📷
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      Upload an image
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      JPG, JPEG, PNG • Maximum 5 MB
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Example: pothole, broken pipe,
                      damaged streetlight, garbage issue
                    </p>

                    <input
                      ref={imageInputRef}
                      id="complaint-image"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                  </label>
                ) : (
                  <div className="rounded-2xl border border-orange-200 bg-orange-50/50 p-4">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-white text-orange-600">
                          🖼️
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-800">
                            {selectedImage.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {(
                              selectedImage.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="self-start text-sm font-semibold text-red-500 transition hover:text-red-600 sm:self-auto"
                      >
                        Remove
                      </button>

                    </div>

                    {/* Image preview */}

                    <div className="mt-4 overflow-hidden rounded-xl border border-orange-100 bg-white">

                      <img
                        src={URL.createObjectURL(
                          selectedImage
                        )}
                        alt="Selected complaint"
                        className="max-h-72 w-full object-contain"
                      />

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      Image selected. Backend attachment
                      upload will be connected when the
                      attachment API is available.
                    </p>

                  </div>
                )}

              </div>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="mb-8">

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-semibold text-slate-800">
                    Location
                  </label>

                  <span className="text-xs text-slate-400">
                    Optional
                  </span>

                </div>

                <button
                  type="button"
                  onClick={
                    locationAdded
                      ? removeLocation
                      : handleAddLocation
                  }
                  disabled={locationLoading}
                  className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                    locationAdded
                      ? "border-green-300 bg-green-50"
                      : locationError
                      ? "border-red-200 bg-red-50"
                      : "border-orange-200 bg-orange-50/40 hover:border-orange-300 hover:bg-orange-50"
                  } disabled:cursor-not-allowed disabled:opacity-70`}
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                          locationAdded
                            ? "border-green-200 bg-white text-green-600"
                            : "border-orange-100 bg-white text-orange-600"
                        }`}
                      >
                        📍
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800">

                          {locationLoading
                            ? "Getting your location..."
                            : locationAdded
                            ? "Location added"
                            : "Add your location"}

                        </p>

                        <p className="mt-1 text-xs text-slate-500">

                          {locationLoading
                            ? "Please allow location access if your browser asks."
                            : locationAdded
                            ? "Your coordinates will be attached to this complaint."
                            : "Helps us identify the location of the reported problem."}

                        </p>

                      </div>

                    </div>

                    <span
                      className={`shrink-0 text-sm font-semibold ${
                        locationAdded
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {locationLoading
                        ? "..."
                        : locationAdded
                        ? "Added ✓"
                        : "Add"}
                    </span>

                  </div>

                </button>

                {locationAdded && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                      <p className="text-xs text-green-700">
                        Latitude
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                        {latitude}
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                      <p className="text-xs text-green-700">
                        Longitude
                      </p>

                      <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                        {longitude}
                      </p>
                    </div>

                  </div>
                )}

                {locationError && (
                  <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                    <p className="text-sm text-red-600">
                      {locationError}
                    </p>

                  </div>
                )}

              </div>

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">

                  <p className="text-sm font-medium text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {success && (
                <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">

                  <p className="text-sm font-medium text-green-700">
                    {success}
                  </p>

                </div>
              )}

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <div className="border-t border-orange-100 pt-6">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-sm font-semibold text-slate-800">
                      Ready to submit?
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Your request will be reviewed and
                      routed to the appropriate department.
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      isRecording ||
                      isTranscribing
                    }
                    className={`w-full rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 sm:w-auto ${
                      isSubmitting ||
                      isRecording ||
                      isTranscribing
                        ? "cursor-not-allowed bg-orange-400"
                        : "bg-orange-600 shadow-orange-900/20 hover:-translate-y-0.5 hover:bg-orange-700"
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

          {/* =================================================
              TRUST NOTE
          ================================================= */}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">

            <span className="text-green-600">
              ✓
            </span>

            Your complaint details will be handled securely.

          </div>

        </div>
      </main>
    </div>
  );
};

export default SubmitComplaint;