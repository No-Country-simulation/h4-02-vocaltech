<<<<<<< HEAD
// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { Dialog } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// interface ModalData {
//   title: string;
//   date: string;
//   time: string;
//   description: string;
//   person: 'Inés' | 'Leandro';
// }

// interface NewEventData {
//   date: Date | null;
//   showModal: boolean;
// }

// export default function Calendar() {
//   const [modalData, setModalData] = useState<ModalData | null>(null);
//   const [newEvent, setNewEvent] = useState<NewEventData>({
//     date: null,
//     showModal: false,
//   });
//   const [formData, setFormData] = useState({
//     title: '',
//     time: '',
//     description: '',
//     person: 'Inés' as 'Inés' | 'Leandro',
//   });

//   const handleEventClick = (info: any) => {
//     const event = info.event;
//     const person = event.extendedProps?.person || 'Desconocido';
//     const time = event.start.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//     setModalData({
//       title: event.title,
//       date: event.start.toLocaleDateString(),
//       description: event.extendedProps?.description || '',
//       time,
//       person,
//     });
//   };

//   const handleDateClick = (info: any) => {
//     setNewEvent({
//       date: info.date,
//       showModal: true,
//     });
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically handle the form submission
//     // For example, add the new event to your events array
//     console.log({
//       ...formData,
//       date: newEvent.date,
//     });
//     closeNewEventModal();
//   };

//   const closeModal = () => {
//     setModalData(null);
//   };

//   const closeNewEventModal = () => {
//     setNewEvent({ date: null, showModal: false });
//     setFormData({
//       title: '',
//       time: '',
//       description: '',
//       person: 'Inés',
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         events={[
//           {
//             title: 'Reunión de diagnóstico',
//             start: '2025-02-03T12:00:00',
//             description: 'Evaluación inicial para mejorar la capacidad con la voz.',
//             person: 'Inés',
//             color: '#3498db',
//           },
//           // ... rest of your events
//         ]}
//       />

//       {/* Existing Event Modal */}
//       {modalData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white text-primary_400 p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">{modalData.title}</h2>
//             <p className="text-black">
//               <strong>Fecha:</strong> {modalData.date}
//             </p>
//             <p className="text-black">
//               <strong>Hora:</strong> {modalData.time}
//             </p>
//             <p className="mt-2 text-black">
//               <strong>Descripción:</strong> {modalData.description}
//             </p>
//             <p className="text-black">
//               <strong>Destinatario:</strong> {modalData.person}
//             </p>
//             <Button onClick={closeModal} className="mt-4">
//               Cerrar
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* New Event Modal */}
//       <Dialog open={newEvent.showModal} onOpenChange={() => closeNewEventModal()}>
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Nuevo Evento</h2>
//             <form onSubmit={handleFormSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="title">Título</Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="time">Hora</Label>
//                 <Input
//                   id="time"
//                   type="time"
//                   value={formData.time}
//                   onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="description">Descripción</Label>
//                 <Input
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="person">Destinatario</Label>
//                 <Select
//                   value={formData.person}
//                   onValueChange={(value: 'Inés' | 'Leandro') => 
//                     setFormData({ ...formData, person: value })
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Seleccionar destinatario" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Inés">Inés</SelectItem>
//                     <SelectItem value="Leandro">Leandro</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex justify-end space-x-2">
//                 <Button type="button" variant="outline" onClick={closeNewEventModal}>
//                   Cancelar
//                 </Button>
//                 <Button type="submit">Guardar</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }
=======
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
>>>>>>> 3533f3946b56f60f7a3bdc6cdc3bc4121940c554
