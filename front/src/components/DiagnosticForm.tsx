import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Toaster, toast } from 'sonner'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

interface DiagnosticFormInputs {
  Type: string
  DescripCorp: string
  SelectArea: string
  Question1: string
  Question2: string
  Question3: string
  Question4: string
  Question5?: string
}

const schema = yup.object({
  Type: yup.string().required('El campo es obligatorio'),
  DescripCorp: yup.string().required('El campo es obligatorio.'),
  SelectArea: yup.string().required('El campo es obligatorio.'),
  Question1: yup.string().required('El campo es obligatorio.'),
  Question2: yup.string().required('El campo es obligatorio'),
  Question3: yup.string().required('El campo es obligatorio'),
  Question4: yup.string().required('El campo es obligatorio'),
  Question5: yup.string().optional()
})

const DiagnosticForm: React.FC = () => {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DiagnosticFormInputs>({
    resolver: yupResolver(schema)
  })

  const [infoFile, setInfoFile] = useState<File | null>(null)
  const [soundFile, setSoundFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      console.log('Subiendo archivo:', file.name)
      const response = await axios.post(
        'https://h4-02-vocaltech.onrender.com/file/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      return response.data.data?.Location || null
    } catch (error) {
      console.error('Error al subir el archivo:', error)
      toast.error('Error al subir el archivo')
      return null
    }
  }

  const onSubmit: SubmitHandler<DiagnosticFormInputs> = async (data) => {
    if (!user?.id) {
      toast.error('Usuario no autenticado')
      return
    }

    setIsSubmitting(true)

    try {
      const infoFileUrl = infoFile ? await uploadFile(infoFile) : null
      const soundFileUrl = soundFile ? await uploadFile(soundFile) : null

      if (!infoFileUrl || !soundFileUrl) {
        toast.error('Error al subir los archivos')
        return
      }

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
        InfoFile: infoFileUrl,
        SoundFile: soundFileUrl
      }

      await axios.post(
        'https://h4-02-vocaltech.onrender.com/api/diagnostics/new',
        payload
      )
      toast.success('Formulario enviado correctamente!')
    } catch (err) {
      console.error('Error en la petición:', err)
      toast.error('Ocurrió un error al enviar el formulario.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex items-center justify-center'>
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
          <label>Adjunta un documento con información necesaria</label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='file'
            onChange={(e) => setInfoFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label>Adjunta tu audio para que podamos evaluarte</label>
          <input
            className='border-sky-50 border-2 rounded-lg p-1'
            type='file'
            accept='audio/*'
            onChange={(e) => setSoundFile(e.target.files?.[0] || null)}
          />
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
          <label>¿Necesitas agregar algo más?</label>
          <textarea
            {...register('Question5')}
            placeholder='Escribe tus comentarios aquí...'
            className='border-sky-50 border-2 rounded-lg p-1'
          ></textarea>
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}

export default DiagnosticForm
