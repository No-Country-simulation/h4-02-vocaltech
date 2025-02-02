import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react'

interface ModalData {
  title: string
  date: string
  time: string
  description: string
  person: 'Inés' | 'Leandro'
}

export default function Calendar() {
  const [modalData, setModalData] = useState<ModalData | null>(null)

  const handleEventClick = (info: any) => {
    const event = info.event
    const person = event.extendedProps?.person || 'Desconocido'
    const time = event.start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    setModalData({
      title: event.title,
      date: event.start.toLocaleDateString(),
      description: event.extendedProps?.description || '',
      time,
      person
    })
  }

  const closeModal = () => {
    setModalData(null)
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={[
          {
            title: 'Reunión de diagnóstico',
            start: '2025-02-03T12:00:00',
            description:
              'Evaluación inicial para mejorar la capacidad con la voz.',
            person: 'Inés',
            color: '#3498db'
          },
          {
            title: 'Planificación de estrategia',
            start: '2025-02-05T10:30:00',
            description: 'Definición de la hoja de ruta del proyecto.',
            person: 'Leandro',
            color: '#59185f'
          },
          {
            title: 'Sesión de práctica vocal',
            start: '2025-02-07T14:00:00',
            description: 'Ejercicios prácticos para mejorar la técnica vocal.',
            person: 'Inés',
            color: '#3498db'
          },
          {
            title: 'Revisión de objetivos',
            start: '2025-02-10T09:00:00',
            description: 'Análisis del avance y ajuste de metas.',
            person: 'Leandro',
            color: '#59185f'
          },
          {
            title: 'Taller de proyección de voz',
            start: '2025-02-12T16:00:00',
            description:
              'Aprendizaje de técnicas para mejorar la presencia vocal.',
            person: 'Inés',
            color: '#3498db'
          },
          {
            title: 'Análisis de métricas',
            start: '2025-02-15T11:30:00',
            description: 'Evaluación de indicadores clave de desempeño.',
            person: 'Leandro',
            color: '#59185f'
          },
          {
            title: 'Sesión de control de tono',
            start: '2025-02-18T13:00:00',
            description:
              'Prácticas para mejorar el control y variación del tono de voz.',
            person: 'Inés',
            color: '#3498db'
          },
          {
            title: 'Revisión final del proyecto',
            start: '2025-02-20T15:30:00',
            description: 'Última reunión para ajustes antes de la entrega.',
            person: 'Leandro',
            color: '#59185f'
          }
        ]}
        eventClick={handleEventClick}
      />

      {modalData && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white  p-6 rounded-lg w-96'>
            <h2 className='text-xl text-black font-semibold mb-4'>
              {modalData.title}
            </h2>
            <p className='text-black'>
              <strong>Fecha:</strong> {modalData.date}
            </p>
            <p className='text-black'>
              <strong>Hora:</strong> {modalData.time}
            </p>
            <p className='mt-2 text-black'>
              <strong>Descripción:</strong> {modalData.description}
            </p>
            <p className='text-black'>
              <strong>Destinatario:</strong> {modalData.person}
            </p>
            <button
              className='mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md'
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
