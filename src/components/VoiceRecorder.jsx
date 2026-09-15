import { useRef, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

const VoiceRecorder = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] =
    useState(false);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Convert recorded browser audio into WAV
  const convertToWav = async (audioBlob) => {
    const arrayBuffer =
      await audioBlob.arrayBuffer();

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    const audioContext = new AudioContext();

    const audioBuffer =
      await audioContext.decodeAudioData(
        arrayBuffer
      );

    const numberOfChannels =
      audioBuffer.numberOfChannels;

    const sampleRate =
      audioBuffer.sampleRate;

    const samples =
      audioBuffer.length;

    const bytesPerSample = 2;

    const blockAlign =
      numberOfChannels * bytesPerSample;

    const buffer = new ArrayBuffer(
      44 + samples * blockAlign
    );

    const view = new DataView(buffer);

    const writeString = (
      offset,
      string
    ) => {
      for (
        let i = 0;
        i < string.length;
        i++
      ) {
        view.setUint8(
          offset + i,
          string.charCodeAt(i)
        );
      }
    };

    writeString(0, "RIFF");

    view.setUint32(
      4,
      36 + samples * blockAlign,
      true
    );

    writeString(8, "WAVE");
    writeString(12, "fmt ");

    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);

    view.setUint16(
      22,
      numberOfChannels,
      true
    );

    view.setUint32(
      24,
      sampleRate,
      true
    );

    view.setUint32(
      28,
      sampleRate * blockAlign,
      true
    );

    view.setUint16(
      32,
      blockAlign,
      true
    );

    view.setUint16(
      34,
      16,
      true
    );

    writeString(36, "data");

    view.setUint32(
      40,
      samples * blockAlign,
      true
    );

    const channels = [];

    for (
      let channel = 0;
      channel < numberOfChannels;
      channel++
    ) {
      channels.push(
        audioBuffer.getChannelData(
          channel
        )
      );
    }

    let offset = 44;

    for (
      let i = 0;
      i < samples;
      i++
    ) {
      for (
        let channel = 0;
        channel < numberOfChannels;
        channel++
      ) {
        let sample =
          channels[channel][i];

        sample = Math.max(
          -1,
          Math.min(1, sample)
        );

        const intSample =
          sample < 0
            ? sample * 0x8000
            : sample * 0x7fff;

        view.setInt16(
          offset,
          intSample,
          true
        );

        offset += 2;
      }
    }

    await audioContext.close();

    return new Blob(
      [buffer],
      { type: "audio/wav" }
    );
  };

  // Send WAV file to backend
  const transcribeAudio = async (
    wavBlob
  ) => {
    try {
      setError("");
      setIsTranscribing(true);

      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setError(
          "Please login first."
        );
        return;
      }

      const audioFile = new File(
        [wavBlob],
        "complaint-audio.wav",
        {
          type: "audio/wav",
        }
      );

      const formData = new FormData();

      formData.append(
        "audio",
        audioFile
      );

      const response = await fetch(
        `${API_BASE_URL}/complaints/transcribe`,
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data =
        await response.json()
          .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail ||
          "Failed to transcribe audio."
        );
      }

      const transcript =
        String(
          data?.text ||
          data?.transcript ||
          data?.transcription ||
          ""
        ).trim();

      if (!transcript) {
        throw new Error(
          "No text was returned."
        );
      }

      // Send text back to SubmitComplaint
      onTranscription(transcript);
    } catch (err) {
      console.error(
        "Transcription error:",
        err
      );

      setError(
        err.message ||
        "Unable to convert voice to text."
      );
    } finally {
      setIsTranscribing(false);
      audioChunksRef.current = [];
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      setError("");

      if (
        !navigator.mediaDevices?.getUserMedia
      ) {
        setError(
          "Audio recording is not supported by this browser."
        );
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia(
          { audio: true }
        );

      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      let options = {};

      if (
        MediaRecorder.isTypeSupported(
          "audio/webm;codecs=opus"
        )
      ) {
        options = {
          mimeType:
            "audio/webm;codecs=opus",
        };
      } else if (
        MediaRecorder.isTypeSupported(
          "audio/webm"
        )
      ) {
        options = {
          mimeType: "audio/webm",
        };
      }

      const recorder =
        new MediaRecorder(
          stream,
          options
        );

      mediaRecorderRef.current =
        recorder;

      recorder.ondataavailable = (
        event
      ) => {
        if (
          event.data &&
          event.data.size > 0
        ) {
          audioChunksRef.current.push(
            event.data
          );
        }
      };

      recorder.onstop = async () => {
        try {
          const recordedBlob =
            new Blob(
              audioChunksRef.current,
              {
                type:
                  recorder.mimeType ||
                  "audio/webm",
              }
            );

          stream
            .getTracks()
            .forEach((track) =>
              track.stop()
            );

          mediaStreamRef.current =
            null;

          // Convert recording → WAV
          const wavBlob =
            await convertToWav(
              recordedBlob
            );

          // WAV → Backend → Text
          await transcribeAudio(
            wavBlob
          );
        } catch (err) {
          console.error(
            "Audio processing error:",
            err
          );

          setError(
            "Unable to process recorded audio."
          );

          setIsTranscribing(false);
        }
      };

      recorder.start();

      setIsRecording(true);
    } catch (err) {
      console.error(
        "Failed to start recording:",
        err
      );

      if (
        err?.name ===
        "NotAllowedError"
      ) {
        setError(
          "Microphone permission was denied. Please allow microphone access."
        );
      } else if (
        err?.name ===
        "NotFoundError"
      ) {
        setError(
          "No microphone was found."
        );
      } else {
        setError(
          "Unable to start recording."
        );
      }

      setIsRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    const recorder =
      mediaRecorderRef.current;

    if (!recorder) {
      return;
    }

    if (
      recorder.state !== "inactive"
    ) {
      recorder.stop();
    }

    setIsRecording(false);
  };

  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {isRecording
              ? "Listening..."
              : isTranscribing
              ? "Converting voice to text..."
              : "Describe with Voice"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {isRecording
              ? "Speak clearly and tap stop when finished."
              : isTranscribing
              ? "Please wait while your voice is being converted."
              : "Your voice will be converted into complaint text."}
          </p>
        </div>

        <button
          type="button"
          onClick={
            isRecording
              ? stopRecording
              : startRecording
          }
          disabled={isTranscribing}
          className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
            isRecording
              ? "bg-slate-800 hover:bg-slate-900"
              : isTranscribing
              ? "cursor-not-allowed bg-blue-400"
              : "bg-orange-600 hover:bg-orange-700"
          }`}
        >
          {isRecording
            ? "Stop Recording"
            : isTranscribing
            ? "Transcribing..."
            : "🎤 Start Recording"}
        </button>
      </div>

      {isRecording && (
        <div className="mt-4 flex items-center gap-2 border-t border-orange-200 pt-4">
          <span className="h-3 w-1 animate-pulse rounded-full bg-orange-400" />
          <span className="h-5 w-1 animate-pulse rounded-full bg-orange-500" />
          <span className="h-8 w-1 animate-pulse rounded-full bg-orange-600" />
          <span className="h-5 w-1 animate-pulse rounded-full bg-orange-500" />

          <span className="ml-2 text-xs font-medium text-orange-700">
            Recording in progress
          </span>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;