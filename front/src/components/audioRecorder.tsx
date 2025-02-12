import React, { useState, useRef } from 'react'

interface AudioRecorderProps {
  onRecordingComplete: (audioFile: File) => void
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete
}) => {
  const [recording, setRecording] = useState<boolean>(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const startRecording = async (e: React.MouseEvent) => {
    // Prevenir el comportamiento por defecto del botón
    e.preventDefault()

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('La grabación de audio no es soportada en este navegador.')
      return
    }
    setAudioURL(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Intentar usar MP3 primero, si no está disponible, usar otros formatos
      const mimeType = MediaRecorder.isTypeSupported('audio/mpeg')
        ? 'audio/mpeg'
        : MediaRecorder.isTypeSupported('audio/mp3')
        ? 'audio/mp3'
        : 'audio/webm'

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType
      })

      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      })

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)

        // Usar la extensión correcta según el tipo MIME
        const extension =
          mimeType.includes('mpeg') || mimeType.includes('mp3') ? 'mp3' : 'webm'

        const audioFile = new File([audioBlob], `grabacion.${extension}`, {
          type: mimeType
        })
        onRecordingComplete(audioFile)
      })

      mediaRecorder.start()
      setRecording(true)
    } catch (error) {
      console.error('Error al iniciar la grabación:', error)
    }
  }

  const stopRecording = (e: React.MouseEvent) => {
    // Prevenir el comportamiento por defecto del botón
    e.preventDefault()

    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop())
      setRecording(false)
    }
  }

  return (
    <div className='p-2 border rounded-md'>
      <h3 className='mb-2 font-semibold'>Grabador de audio</h3>
      <div className='flex gap-2'>
        <button
          type='button' // Aseguramos que el botón no sea de tipo submit
          onClick={startRecording}
          disabled={recording}
          className='px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50'
        >
          Iniciar Grabación
        </button>
        <button
          type='button' // Aseguramos que el botón no sea de tipo submit
          onClick={stopRecording}
          disabled={!recording}
          className='px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50'
        >
          Detener Grabación
        </button>
      </div>
      {audioURL && (
        <div className='mt-4'>
          <p className='mb-1'>Audio grabado:</p>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  )
}

export default AudioRecorder
