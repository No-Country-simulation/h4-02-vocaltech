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
  type MRT_ColumnDef,
  MRT_Row
} from 'material-react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { IDiagnostic } from '../../types/Diagnostic'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import {
  IconButton,
  Tooltip,
  Box,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem
} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'

const DiagnosticTable = () => {
  const [data, setData] = useState<IDiagnostic[]>([])
  const [products, setProducts] = useState<any[]>([]) // Guardamos los productos
  const [users, setUsers] = useState<any[]>([]) // Guardamos los usuarios
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  )
  const [newCategory, setNewCategory] = useState<string>('')

  const [openModal, setOpenModal] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState<string>('')

  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      try {
        const response = await fetch(
          'https://h4-02-vocaltech.onrender.com/api/airtable/diagnostics'
        )
        if (!response.ok) {
          throw new Error('Error al obtener los diagnósticos')
        }
        const apiData = await response.json()

        let productsMap = {}
        try {
          const productResponse = await fetch(
            'https://h4-02-vocaltech.onrender.com/api/airtable/products'
          )
          if (productResponse.ok) {
            const productData = await productResponse.json()

            productsMap = productData.reduce((acc: any, item: any) => {
              acc[item.id] = {
                NameProduct: item.fields.NameProduct,
                Category: item.fields.Category
              }
              return acc
            }, {})
          }
        } catch (productError) {
          console.error('Error al obtener los productos', productError)
        }

        let usersMap = {}
        try {
          const userResponse = await fetch(
            'https://h4-02-vocaltech.onrender.com/api/airtable/users'
          )
          if (userResponse.ok) {
            const userData = await userResponse.json()

            usersMap = userData.reduce((acc: any, user: any) => {
              acc[user.id] = user.fields.email
              return acc
            }, {})
          }
        } catch (userError) {
          console.error('Error al obtener los usuarios', userError)
        }

        const transformedData = apiData.map((item: any) => ({
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
          email:
            item.fields.idUser && usersMap[item.fields.idUser]
              ? usersMap[item.fields.idUser]
              : 'Email no disponible'
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
      {
        accessorKey: 'Type',
        header: 'Type',
        muiTableBodyCellProps: { style: { color: 'black' } }
      },
      {
        accessorKey: 'DescripCorp',
        header: 'Descripción'
      },
      {
        accessorKey: 'SelectArea',
        header: 'Área'
      },
      {
        accessorKey: 'InfoFile',
        header: 'Archivo'
      },
      {
        accessorKey: 'SoundFile',
        header: 'Audio'
      },
      {
        accessorKey: 'TimeStamp',
        header: 'Tiempo'
      },
      {
        accessorKey: 'Status',
        header: 'Status'
      },
      {
        accessorKey: 'Question1',
        header: 'Pregunta 1'
      },
      {
        accessorKey: 'Question2',
        header: 'Pregunta 2'
      },
      {
        accessorKey: 'Question3',
        header: 'Pregunta 3'
      },
      {
        accessorKey: 'Question4',
        header: 'Pregunta 4'
      },
      {
        accessorKey: 'Question5',
        header: 'Pregunta 5'
      },
      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell, row }: any) => (
          <Button
            startIcon={<EmailIcon />}
            onClick={() => {
              const email = cell.getValue()
              const subject = 'Detalles del diagnóstico'

              const getQuestionText = (question: any) => {
                if (Array.isArray(question)) {
                  return question.join(', ')
                }
                return question || 'N/A'
              }

              const body = `
Hola,

Aquí tienes los detalles del diagnóstico:

------------------------------------
**Tipo**: ${row.original.Type}
**Descripción**: ${row.original.DescripCorp}
**Área seleccionada**: ${row.original.SelectArea}
**Fecha**: ${row.original.TimeStamp}
**Estado**: ${row.original.Status}

------------------------------------
**Preguntas**:

- **Pregunta 1**: ${getQuestionText(row.original.Question1)}
- **Pregunta 2**: ${getQuestionText(row.original.Question2)}
- **Pregunta 3**: ${getQuestionText(row.original.Question3)}
- **Pregunta 4**: ${getQuestionText(row.original.Question4)}
- **Pregunta 5**: ${getQuestionText(row.original.Question5)}

------------------------------------
**Producto relacionado**: ${row.original.NameProduct}
**Categoría**: ${row.original.Category?.join(', ') || 'Sin categoría'}

------------------------------------


Pronto contactaremos contigo para darte una solución,

Si necesitas más información o detalles adicionales, no dudes en contactarnos.

Saludos cordiales,  
VocalTech
`

              const formattedBody = body
                .replace(/\n/g, '%0A')
                .replace(/ /g, '%20')

              window.location.href = `mailto:${email}?subject=${subject}&body=${formattedBody}`
            }}
          >
            Enviar Email
          </Button>
        )
      },
      {
        accessorKey: 'NameProduct',
        header: 'Product Name'
      },
      {
        accessorKey: 'Category',
        header: 'Category',
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
              <span>{cell.getValue()}</span>
            )}
            <IconButton
              sx={{
                fontSize: '1rem',
                padding: '4px'
              }}
              onClick={() => {
                if (editingCategoryId === row.id) {
                  const updatedData = [...data]
                  updatedData[row.index] = {
                    ...updatedData[row.index],
                    Category: newCategory
                  }
                  setData(updatedData)
                } else {
                  setNewCategory(cell.getValue())
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
      }
    ],
    [data, editingCategoryId, newCategory]
  )

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true
  })

  const handleExportData = () => {
    const csvData = data.map((diagnostic) => ({
      ...diagnostic
    }))
    const csv = generateCsv(csvConfig)(csvData)
    download(csvConfig)(csv)
  }

  if (isLoading) {
    return <div>Cargando diagnósticos...</div>
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      enableColumnOrdering
      enableGlobalFilter
      initialState={{
        pagination: {
          pageSize: 10,
          pageIndex: 0
        }
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap'
          }}
        >
          <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
            Export All Data
          </Button>
        </Box>
      )}
      muiTableBodyCellProps={{
        sx: {
          fontSize: '0.875rem',
          padding: '8px'
        }
      }}
      muiTableHeadCellProps={{
        sx: {
          fontSize: '1rem',
          fontWeight: 'bold'
        }
      }}
      muiTableContainerProps={{
        sx: {
          maxHeight: '500px',
          overflowY: 'auto'
        }
      }}
      muiTablePaginationProps={{
        sx: {
          fontSize: '0.875rem'
        }
      }}
    />
  )
}

export default DiagnosticTable
