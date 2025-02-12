import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import api from '../services/api'
import { Toaster, toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import AudioRecorder from './audioRecorder'

interface DiagnosticFormInputs {
  Type: string
  DescripCorp: string
  SelectArea: string
  Question1: string
  Question2: string
  Question3: string
  Question4: string
  Question5?: string
  idProduct: string[]
  Diagnostic?: string
  InfoFile?: File | null
  SoundFile?: File | null
}

const schema = yup.object().shape({
  Type: yup.string().required('El campo es obligatorio'),
  DescripCorp: yup.string().required('El campo es obligatorio.'),
  SelectArea: yup.string().required('El campo es obligatorio.'),
  Question1: yup.string().required('El campo es obligatorio.'),
  Question2: yup.string().required('El campo es obligatorio'),
  Question3: yup.string().required('El campo es obligatorio'),
  Question4: yup.string().required('El campo es obligatorio'),
  Question5: yup.string().optional(),
  idProduct: yup
    .array()
    .of(yup.string().required())
    .default([])
    .min(1, 'Debe seleccionar al menos un producto'),
  Diagnostic: yup.string().optional(),
  InfoFile: yup.mixed<File>().nullable(),
  SoundFile: yup.mixed<File>().nullable()
})

const DiagnosticForm: React.FC = () => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<DiagnosticFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      idProduct: []
    }
  })

  const [infoFile, setInfoFile] = useState<File | null>(null)
  const [soundFile, setSoundFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [audioOption, setAudioOption] = useState<'upload' | 'record'>('upload')

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'https://h4-02-vocaltech.onrender.com/file/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      return response.data.data?.Location || null
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Detalles del error:', error.response.data)
        toast.error(
          error.response.data?.message || 'Error al subir el archivo.'
        )
        return null
      } else {
        toast.error('Error inesperado al subir el archivo.')
      }
    }
  }

  const handleCheckboxChange = (value: string) => {
    setSelectedProducts((prev) => {
      const updatedProducts = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]

      setValue('idProduct', updatedProducts, { shouldValidate: true })
      return updatedProducts
    })
  }

  const onSubmit: SubmitHandler<DiagnosticFormInputs> = async (data) => {
    console.log('Enviando datos:', data)
    if (!user?.id) {
      toast.error('Usuario no autenticado')
      return
    }

    setIsSubmitting(true)

    try {
      // Solo subimos los archivos si han sido seleccionados
      const infoFileUrl = infoFile ? await uploadFile(infoFile) : ''
      const soundFileUrl = soundFile ? await uploadFile(soundFile) : ''

      if ((infoFile && !infoFileUrl) || (soundFile && !soundFileUrl)) {
        toast.error('Error al subir los archivos')
        return
      }

      // Construir el payload para el formulario
      const payload = {
        idUser: [user.id],
        Type: data.Type,
        DescripCorp: data.DescripCorp,
        SelectArea: data.SelectArea,
        Question1: data.Question1,
        Question2: data.Question2,
        Question3: data.Question3,
        Question4: data.Question4,
        Question5: data.Question5 || '',
        idProduct: data.idProduct || [],
        InfoFile: infoFileUrl || '', // Si no hay archivo, se manda como string vacío
        SoundFile: soundFileUrl || '', // Igual para el archivo de sonido
        Diagnostic: data.Diagnostic || 'Sin diagnóstico aún'
      }

      try {
        await api.post('/diagnostics/new', payload)
        toast.success('Formulario enviado correctamente!')
      } catch (err) {
        console.error('Error en la petición:', err)
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Ocurrió un error al enviar el formulario.')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex items-center justify-center form-diagnostic'>
      <Toaster position='bottom-right' richColors />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-2/3 justify-center items-center gap-4 p-8'
      >
        <div className='flex flex-col w-full gap-2'>
          <label>¿Eres empresa o emprendedor?</label>
          <select
            className='border-sky-50 border-2 rounded-lg p-1'
            {...register('Type')}
          >
            <option value='EMPRENDEDOR'>Emprendedor</option>
            <option value='EMPRESA'>Empresa</option>
          </select>
          {errors.Type && <p>{errors.Type.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Descripción del proyecto</label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='text'
            {...register('DescripCorp')}
            placeholder='Ingresa el nombre de la empresa'
          />
          {errors.DescripCorp && <p>{errors.DescripCorp.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Área de trabajo</label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='text'
            {...register('SelectArea')}
            placeholder='Ingresa el área de trabajo'
          />
          {errors.SelectArea && <p>{errors.SelectArea.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>
            ¿Qué tan efectivo consideras tu liderazgo para inspirar y conectar
            con otros?
          </label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='text'
            {...register('Question1')}
            placeholder='Escribe tu respuesta aquí...'
          />
          {errors.Question1 && <p>{errors.Question1.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>
            ¿Qué tan claro y persuasivo es tu mensaje al hablar de tus ideas?
          </label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='text'
            {...register('Question2')}
            placeholder='Escribe tu respuesta aquí...'
          />
          {errors.Question2 && <p>{errors.Question2.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>
            ¿Cuentas con herramientas para validar tus ideas en el mercado?
          </label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='text'
            {...register('Question3')}
            placeholder='Escribe tu respuesta aquí...'
          />
          {errors.Question3 && <p>{errors.Question3.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>¿Tienes acceso a talento o equipos que puedan ayudarte?</label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='text'
            {...register('Question4')}
            placeholder='Escribe tu respuesta aquí...'
          />
          {errors.Question4 && <p>{errors.Question4.message}</p>}
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Adjunta un documento con información necesaria</label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='file'
            onChange={(e) => setInfoFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label htmlFor='upload' className='ml-2'>
            Subir archivo
          </label>
          <div>
            <input
              type='radio'
              id='record'
              name='audioOption'
              value='record'
              checked={audioOption === 'record'}
              onChange={() => setAudioOption('record')}
            />
            <label htmlFor='record' className='ml-2'>
              Grabar audio
            </label>
          </div>
        </div>

        {audioOption === 'upload' ? (
          <div className='flex flex-col w-full gap-2'>
            <label>Adjunta tu audio para que podamos evaluarte</label>
            <input
              className='border-sky-50 border-2 rounded-lg p-1'
              type='file'
              accept='audio/*'
              onChange={(e) => setSoundFile(e.target.files?.[0] || null)}
            />
          </div>
        ) : (
          <div className='flex flex-col w-full gap-2'>
            <label>Graba tu audio</label>
            <AudioRecorder
              onRecordingComplete={(audioFile) => setSoundFile(audioFile)}
            />
          </div>
        )}

        <div className='flex flex-col w-full gap-2'>
          <label>¿Necesitas agregar algo más?</label>
          <textarea
            {...register('Question5')}
            placeholder='Escribe tus comentarios aquí...'
            className='border-sky-50 border-2 rounded-lg p-1'
          ></textarea>
        </div>

        <div className='flex flex-col w-full gap-2 items-start'>
          <label>¿En qué servicios estás interesado?</label>
          <div>
            <input
              type='checkbox'
              value='rec0PnF24uiS7REmy'
              checked={selectedProducts.includes('rec0PnF24uiS7REmy')}
              onChange={() => handleCheckboxChange('rec0PnF24uiS7REmy')}
            />
            <label className='ml-2'>Optimización de recursos y capital</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='rec6rLAB0udFpZaWO'
              checked={selectedProducts.includes('rec6rLAB0udFpZaWO')}
              onChange={() => handleCheckboxChange('rec6rLAB0udFpZaWO')}
            />
            <label className='ml-2'>Fortalecer la voz de la empresa</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='rec7Kvtsi5jibgdw4'
              checked={selectedProducts.includes('rec7Kvtsi5jibgdw4')}
              onChange={() => handleCheckboxChange('rec7Kvtsi5jibgdw4')}
            />
            <label className='ml-2'>Liderar a través de la voz</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='recKBWWjOys1qE09F'
              checked={selectedProducts.includes('recKBWWjOys1qE09F')}
              onChange={() => handleCheckboxChange('recKBWWjOys1qE09F')}
            />
            <label className='ml-2'>Desarrollo de MVP en 5 semanas</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='recNQqMYvhqxxYHcu'
              checked={selectedProducts.includes('recNQqMYvhqxxYHcu')}
              onChange={() => handleCheckboxChange('recNQqMYvhqxxYHcu')}
            />
            <label className='ml-2'>Optimización de recursos y capital</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='recXZadExtWReRdq6'
              checked={selectedProducts.includes('recXZadExtWReRdq6')}
              onChange={() => handleCheckboxChange('recXZadExtWReRdq6')}
            />
            <label className='ml-2'>Coaching individual</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='recfm4Hm4kDmGFI35'
              checked={selectedProducts.includes('recfm4Hm4kDmGFI35')}
              onChange={() => handleCheckboxChange('recfm4Hm4kDmGFI35')}
            />
            <label className='ml-2'>Capacitaciones para empresas</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='reczzG59J7DTbyFYO'
              checked={selectedProducts.includes('reczzG59J7DTbyFYO')}
              onChange={() => handleCheckboxChange('reczzG59J7DTbyFYO')}
            />
            <label className='ml-2'>Charlas inspiradoras</label>
          </div>
          <div>
            <input
              type='checkbox'
              value='recMFt1jIenek2lKv'
              checked={selectedProducts.includes('recMFt1jIenek2lKv')}
              onChange={() => handleCheckboxChange('recMFt1jIenek2lKv')}
            />
            <label className='ml-2'>Entrenamiento personalizado</label>
          </div>
        </div>

        <button
          type='submit'
          className='bg-anaranjado text-white px-4 py-2 rounded-md'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
        </button>
      </form>
    </div>
  )
}

export default DiagnosticForm
