// const parseTimestamp = (timestamp: string): Date => {
//     const [datePart, timePart] = timestamp.split(" "); // ["16/1/2025", "15:48"]
//     const [day, month, year] = datePart.split("/").map(Number); // [16, 1, 2025]
//     const [hours, minutes] = timePart.split(":").map(Number); // [15, 48]

//     return new Date(year, month - 1, day, hours, minutes);
//   };

//   const timestampAsDate = parseTimestamp(rawTimestamp);
//   console.log(timestampAsDate); // 2025-01-16T15:48:00.000Z (dependiendo de la zona horaria)
// const rawTimestamp: string = "16/1/2025 15:48"; Esto se recibiria de la api

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from 'material-react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { IDiagnostic } from '../../types/Diagnostic'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import {
  IconButton,
  Tooltip,
  Box,
  Button,
  Select,
  MenuItem
} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'

const DiagnosticTable = () => {
  const [data, setData] = useState<IDiagnostic[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  )
  const [newCategory, setNewCategory] = useState<string>('')

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      try {
        const response = await fetch(
          'https://h4-02-vocaltech.onrender.com/api/airtable/diagnostics'
        )
        if (!response.ok) throw new Error('Error al obtener los diagnósticos')

        const apiData = await response.json()

        let productsMap: Record<
          string,
          { NameProduct: string; Category: string[] }
        > = {}
        try {
          const productResponse = await fetch(
            'https://h4-02-vocaltech.onrender.com/api/airtable/products'
          )
          if (productResponse.ok) {
            const productData = await productResponse.json()
            productsMap = productData.reduce(
              (acc: typeof productsMap, item: any) => {
                acc[item.id] = {
                  NameProduct: item.fields.NameProduct,
                  Category: item.fields.Category
                    ? [item.fields.Category]
                    : ['Sin categoría']
                }
                return acc
              },
              {}
            )
          }
        } catch (error) {
          console.error('Error al obtener los productos', error)
        }

        let usersMap: Record<string, string> = {}
        try {
          const userResponse = await fetch(
            'https://h4-02-vocaltech.onrender.com/api/airtable/users'
          )
          if (userResponse.ok) {
            const userData = await userResponse.json()
            usersMap = userData.reduce((acc: typeof usersMap, user: any) => {
              acc[user.id] = user.fields.email
              return acc
            }, {})
          }
        } catch (error) {
          console.error('Error al obtener los usuarios', error)
        }

        const transformedData: IDiagnostic[] = apiData.map((item: any) => ({
          idUser: item.fields.idUser,
          Type: item.fields.Type,
          DescripCorp: item.fields.DescripCorp,
          SelectArea: item.fields.SelectArea,
          InfoFile: item.fields.infoFile,
          SoundFile: item.fields.SoundFile,
          TimeStamp: item.fields.TimeStamp,
          Status: item.fields.Status,
          Question1: item.fields.Question1,
          Question2: item.fields.Question2,
          Question3: item.fields.Question3,
          Question4: item.fields.Question4,
          Question5: item.fields.Question5,
          idProduct: item.fields.idProduct,
          Category:
            item.fields.idProduct && item.fields.idProduct.length > 0
              ? productsMap[item.fields.idProduct[0]]?.Category || [
                  'Sin categoría'
                ]
              : ['Sin categoría'],
          NameProduct:
            item.fields.idProduct && item.fields.idProduct.length > 0
              ? productsMap[item.fields.idProduct[0]]?.NameProduct ||
                'Producto no encontrado'
              : 'Producto no encontrado',
          email: usersMap[item.fields.idUser] || 'Email no disponible'
        }))

        setData(transformedData)
      } catch (error) {
        console.error('Error fetching diagnostics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsersAndProducts()
  }, [])

  const columns = useMemo<MRT_ColumnDef<IDiagnostic>[]>(
    () => [
      { accessorKey: 'Type', header: 'Tipo' },
      { accessorKey: 'DescripCorp', header: 'Descripción' },
      { accessorKey: 'SelectArea', header: 'Área' },
      { accessorKey: 'TimeStamp', header: 'Tiempo' },
      { accessorKey: 'Status', header: 'Estado' },
      { accessorKey: 'NameProduct', header: 'Producto' },
      {
        accessorKey: 'Category',
        header: 'Categoría',
        Cell: ({ cell, row }: any) => (
          <>
            {editingCategoryId === row.id ? (
              <Select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {['VOCAL', 'TECH', 'Sin categoría'].map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <span>{cell.getValue()?.join(', ')}</span>
            )}
            <IconButton
              sx={{ fontSize: '1rem', padding: '4px' }}
              onClick={() => {
                if (editingCategoryId === row.id) {
                  const updatedData = [...data]
                  updatedData[row.index] = {
                    ...updatedData[row.index],
                    Category: [newCategory]
                  }
                  setData(updatedData)
                } else {
                  setNewCategory(cell.getValue()[0] || 'Sin categoría')
                }
                setEditingCategoryId(
                  editingCategoryId === row.id ? null : row.id
                )
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        )
      },
      { accessorKey: 'Question1', header: 'Pregunta 1' },
      { accessorKey: 'Question2', header: 'Pregunta 2' },
      { accessorKey: 'Question3', header: 'Pregunta 3' },
      { accessorKey: 'Question4', header: 'Pregunta 4' },
      { accessorKey: 'Question5', header: 'Pregunta 5' },
      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell, row }: any) => {
          const email = cell.getValue()
          const subject = 'Detalles del diagnóstico'
          const body = `
Hola,

Aquí tienes los detalles del diagnóstico:

Tipo: ${row.original.Type}
Descripción: ${row.original.DescripCorp}
Área: ${row.original.SelectArea}
Fecha: ${row.original.TimeStamp}
Estado: ${row.original.Status}

Preguntas:
1. ${row.original.Question1}
2. ${row.original.Question2}
3. ${row.original.Question3}
4. ${row.original.Question4}
5. ${row.original.Question5}

Producto relacionado: ${row.original.NameProduct}
Categoría: ${row.original.Category?.join(', ') || 'Sin categoría'}

Transformá tu comunicación y liderazgo a través del poder de tu voz. Este programa está diseñado para la empresa en todas sus jerarquias.

Recomendamos trabajar:
La voz conectada con el cuerpo,Tu voz y la relación con el otro

¿Qué vas a lograr?
Persuadir a través de tu voz,Mayor confianza y credibilidad,Transmitir un mensaje convincente

En breve, recibirás una recomendación personalizada con las mejores soluciones para ti.

¡Nos emociona acompañarte en este camino!


Saludos,
VocalTech`.replace(/\n/g, '%0A')

          return (
            <Button
              startIcon={<EmailIcon />}
              onClick={() =>
                (window.location.href = `mailto:${email}?subject=${subject}&body=${body}`)
              }
            >
              Enviar Email
            </Button>
          )
        }
      }
    ],
    [data, editingCategoryId, newCategory]
  )

  if (isLoading) return <div>Cargando diagnósticos...</div>

  return <MaterialReactTable columns={columns} data={data} />
}

export default DiagnosticTable
