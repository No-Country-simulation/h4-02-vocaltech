// AudioRecorder.tsx
import React, { useState, useRef } from "react";

interface AudioRecorderProps {
  onRecordingComplete: (audioFile: File) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    // Verifica que el navegador soporte la grabación
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("La grabación de audio no es soportada en este navegador.");
      return;
    }
    setAudioURL(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        // Convierte el Blob a un objeto File 
        const audioFile = new File([audioBlob], "grabacion.webm", { type: audioBlob.type });
        onRecordingComplete(audioFile);
      });

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="p-2 border rounded-md">
      <h3 className="mb-2 font-semibold">Grabador de audio</h3>
      <div className="flex gap-2">
        <button
          onClick={startRecording}
          disabled={recording}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          Iniciar Grabación
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Detener Grabación
        </button>
      </div>
      {audioURL && (
        <div className="mt-4">
          <p className="mb-1">Audio grabado:</p>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;