import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

interface ModalData {
  title: string
  date: string
  time: string
  description: string
  person: 'Inés' | 'Leandro'
}

interface NewEventData {
  date: Date | null
  showModal: boolean
}

export default function Calendar() {
  const [modalData, setModalData] = useState<ModalData | null>(null)
  const [newEvent, setNewEvent] = useState<NewEventData>({
    date: null,
    showModal: false
  })
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    description: '',
    person: 'Inés' as 'Inés' | 'Leandro'
  })

  const handleEventClick = (info: { event: any }) => {
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

  const handleDateClick = (info: { date: Date }) => {
    setNewEvent({
      date: info.date,
      showModal: true
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      ...formData,
      date: newEvent.date
    })
    closeNewEventModal()
  }

  const closeModal = () => {
    setModalData(null)
  }

  const closeNewEventModal = () => {
    setNewEvent({ date: null, showModal: false })
    setFormData({
      title: '',
      time: '',
      description: '',
      person: 'Inés'
    })
  }

  return (
    <div className='space-y-4'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={[
          {
            title: 'Reunión de diagnóstico',
            start: '2025-02-03T12:00:00',
            description:
              'Evaluación inicial para mejorar la capacidad con la voz.',
            person: 'Inés',
            color: '#3498db'
          }
        ]}
      />

      {modalData && (
        <Dialog open={Boolean(modalData)} onClose={closeModal}>
          <DialogTitle>{modalData.title}</DialogTitle>
          <DialogContent>
            <p>
              <strong>Fecha:</strong> {modalData.date}
            </p>
            <p>
              <strong>Hora:</strong> {modalData.time}
            </p>
            <p>
              <strong>Descripción:</strong> {modalData.description}
            </p>
            <p>
              <strong>Destinatario:</strong> {modalData.person}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={newEvent.showModal} onClose={closeNewEventModal}>
        <DialogTitle>Nuevo Evento</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit} className='space-y-4'>
            <TextField
              label='Título'
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, title: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              label='Hora'
              type='time'
              value={formData.time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, time: e.target.value })
              }
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label='Descripción'
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel>Destinatario</InputLabel>
              <Select
                value={formData.person}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    person: e.target.value as 'Inés' | 'Leandro'
                  })
                }
              >
                <MenuItem value='Inés'>Inés</MenuItem>
                <MenuItem value='Leandro'>Leandro</MenuItem>
              </Select>
            </FormControl>

            <DialogActions>
              <Button onClick={closeNewEventModal}>Cancelar</Button>
              <Button type='submit' variant='contained'>
                Guardar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
