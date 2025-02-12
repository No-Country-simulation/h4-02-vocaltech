import React, { useEffect, useState, useMemo } from 'react'
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table'
import { Box, Button, IconButton, MenuItem, Select } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import EditIcon from '@mui/icons-material/Edit'
import EmailIcon from '@mui/icons-material/Email'
import { IDiagnostic } from '../../types/Diagnostic'
import { mkConfig, generateCsv, download } from 'export-to-csv'

const DiagnosticTable = () => {
  const [data, setData] = useState<IDiagnostic[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  )
  const [newCategory, setNewCategory] = useState<string>('') // Cambiado a string para seleccionar categorías

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
                    ? Array.isArray(item.fields.Category)
                      ? item.fields.Category
                      : [item.fields.Category]
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
          // Asumiendo que Category puede ser un array, tomar solo el primer valor
          Category:
            item.fields.idProduct && item.fields.idProduct.length > 0
              ? productsMap[item.fields.idProduct[0]]?.Category?.[0] ||
                'Sin categoría'
              : 'Sin categoría', // Cambié esto para que sea un string
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
      { accessorKey: 'Status', header: 'Estado' },
      { accessorKey: 'NameProduct', header: 'Producto' },
      { accessorKey: 'Question1', header: 'Pregunta 1' },
      { accessorKey: 'Question2', header: 'Pregunta 2' },
      { accessorKey: 'Question3', header: 'Pregunta 3' },
      { accessorKey: 'Question4', header: 'Pregunta 4' },
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
              <span>{cell.getValue() || 'Sin categoría'}</span>
            )}
            <IconButton
              sx={{ fontSize: '1rem', padding: '4px' }}
              onClick={() => {
                if (editingCategoryId === row.id) {
                  const updatedData = [...data]
                  updatedData[row.index] = {
                    ...updatedData[row.index],
                    Category: newCategory // Actualizamos Category como string
                  }
                  setData(updatedData)
                } else {
                  setNewCategory(cell.getValue() || 'Sin categoría')
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
      { accessorKey: 'Question5', header: 'Pregunta 5' },
      { accessorKey: 'InfoFile', header: 'PDF' },
      { accessorKey: 'SoundFile', header: 'Audio' },
      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ cell, row }: any) => {
          const email = cell.getValue()
          const subject = 'Detalles del diagnóstico'
          const body =
            `Hola,%0A%0AAquí tienes los detalles del diagnóstico:%0A%0ATipo: ${
              row.original.Type
            }%0ADescripción: ${row.original.DescripCorp}%0AÁrea: ${
              row.original.SelectArea
            }%0AFecha: ${row.original.TimeStamp}%0AEstado: ${
              row.original.Status
            }%0APreguntas:%0A1. ${row.original.Question1}%0A2. ${
              row.original.Question2
            }%0A3. ${row.original.Question3}%0A4. ${
              row.original.Question4
            }%0A5. ${row.original.Question5}%0AProducto relacionado: ${
              row.original.NameProduct
            }%0ACategoría: ${
              row.original.Category || 'Sin categoría'
            }%0A%0ATransformá tu comunicación y liderazgo a través del poder de tu voz. Este programa está diseñado para la empresa en todas sus jerarquias.%0A%0ARecomendamos trabajar:%0ALa voz conectada con el cuerpo, Tu voz y la relación con el otro%0A%0A¿Qué vas a lograr?%0APersuadir a través de tu voz, Mayor confianza y credibilidad, Transmitir un mensaje convincente%0A%0AEn breve, recibirás una recomendación personalizada con las mejores soluciones para ti.%0A%0A¡Nos emociona acompañarte en este camino!%0A%0ASaludos,%0AVocalTech`.replace(
              /\n/g,
              '%0A'
            )

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

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true
  })

  const handleExportData = () => {
    const csvData = data.map((diagnostic) => ({
      ...diagnostic,
      Category: diagnostic.Category // Nos aseguramos de que Category sea un string aquí
    }))
    const csv = generateCsv(csvConfig)(csvData)
    download(csvConfig)(csv)
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
      renderTopToolbarCustomActions={() => (
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
    />
  )
}

export default DiagnosticTable
