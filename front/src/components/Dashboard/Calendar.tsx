import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'

interface ModalData {
  title: string
  date: string
  time: string
  description: string
  person: 'Inés' | 'Leandro'
}

interface CalendarProps {
  userId?: string
}

interface CreateModalData {
  date: string
  time: string
  description: string
}

export default function Calendar({ userId }: CalendarProps) {
  const [modalData, setModalData] = useState<ModalData | null>(null)
  const [createModal, setCreateModal] = useState<CreateModalData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [events, setEvents] = useState([
    {
      title: 'Reunión de diagnóstico',
      start: '2025-02-03T12:00:00',
      description: 'Evaluación inicial para mejorar la capacidad con la voz.',
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
      description: 'Aprendizaje de técnicas para mejorar la presencia vocal.',
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
  ])

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

  const handleDateClick = (info: any) => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`

    setCreateModal({
      date: info.dateStr,
      time: currentTime,
      description: ''
    })
  }

  const handleCreateAppointment = async () => {
    if (!createModal) return
    setError(null)

    if (!createModal.time || !createModal.description) {
      setError('Por favor completa todos los campos')
      return
    }

    const { date, time, description } = createModal
    const dateTime = `${date}T${time}:00`

    try {
      const response = await fetch(
        'https://h4-02-vocaltech.onrender.com/api/appointments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            dateTime,
            description,
            userId
          })
        }
      )

      if (!response.ok) throw new Error('Error al crear la cita')

      // Añadir el nuevo evento al estado local
      setEvents((prev) => [
        ...prev,
        {
          title: 'Nueva cita',
          start: dateTime,
          description,
          person: 'Inés',
          color: '#3498db'
        }
      ])

      setCreateModal(null)
    } catch (error) {
      setError('Error al crear la cita. Por favor intenta nuevamente.')
    }
  }

  return (
    <div className='relative'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        events={events}
        eventClick={handleEventClick}
        selectable={true}
        dateClick={handleDateClick}
        locale='es'
      />

      {modalData && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 max-w-[90%] mx-4'>
            <h2 className='text-xl font-semibold mb-4 text-primary_400'>
              {modalData.title}
            </h2>
            <p className='text-gray-700'>
              <strong>Fecha:</strong> {modalData.date}
            </p>
            <p className='text-gray-700'>
              <strong>Hora:</strong> {modalData.time}
            </p>
            <p className='mt-2 text-gray-700'>
              <strong>Descripción:</strong> {modalData.description}
            </p>
            <p className='text-gray-700'>
              <strong>Destinatario:</strong> {modalData.person}
            </p>
            <button
              className='mt-4 bg-primary_400 hover:bg-primary_500 text-white px-4 py-2 rounded-md w-full'
              onClick={() => setModalData(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {createModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 max-w-[90%] mx-4'>
            <h2 className='text-xl font-semibold mb-4 text-primary_400'>
              Crear Nueva Cita
            </h2>
            <p className='text-gray-700'>
              <strong>Fecha seleccionada:</strong> {createModal.date}
            </p>

            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

            <div className='mt-4'>
              <label className='block mb-2 text-gray-700'>Hora:</label>
              <input
                type='time'
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary_400'
                value={createModal.time}
                onChange={(e) =>
                  setCreateModal({
                    ...createModal,
                    time: e.target.value
                  })
                }
              />
            </div>

            <div className='mt-4'>
              <label className='block mb-2 text-gray-700'>Descripción:</label>
              <textarea
                className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary_400'
                rows={3}
                value={createModal.description}
                onChange={(e) =>
                  setCreateModal({
                    ...createModal,
                    description: e.target.value
                  })
                }
                placeholder='Describe el motivo de la cita...'
              />
            </div>

            <div className='mt-6 flex gap-2'>
              <button
                className='flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md'
                onClick={() => setCreateModal(null)}
              >
                Cancelar
              </button>
              <button
                className='flex-1 bg-primary_400 hover:bg-primary_500 text-white px-4 py-2 rounded-md'
                onClick={handleCreateAppointment}
              >
                Crear Cita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
