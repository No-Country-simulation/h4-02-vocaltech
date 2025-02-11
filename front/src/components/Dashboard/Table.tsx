import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { IUser } from '../../types/User'
import { Edit, Delete } from '@mui/icons-material'
import { IconButton, Tooltip, Box, Button } from '@mui/material'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

function Table() {
  const [data, setData] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://h4-02-vocaltech.onrender.com/api/airtable/users'
        )
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios')
        }
        const apiData = await response.json()

        const transformedData = apiData.map((item: any) => ({
          id: item.id,
          email: item.fields.email,
          name: item.fields.name,
          active: item.fields.active,
          company: item.fields.company,
          description: item.fields.description,
          phone: item.fields.phone,
          role: item.fields.role,
          status: item.fields.status
        }))

        setData(transformedData)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        muiTableBodyCellProps: { style: { color: 'black' } }
      },
      {
        accessorKey: 'company',
        header: 'Company'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'phone',
        header: 'Phone'
      },
      {
        accessorKey: 'status',
        header: 'Status'
      },
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Tooltip title='Edit'>
              <IconButton onClick={() => console.log('Edit', row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton onClick={() => console.log('Delete', row.original)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    []
  )

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true
  })

  const handleExportData = () => {
    const csvData = data.map((user) => ({
      ...user
    }))
    const csv = generateCsv(csvConfig)(csvData)
    download(csvConfig)(csv)
  }

  if (isLoading) {
    return <div>Cargando usuarios...</div>
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
      </Box>
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
      />
    </>
  )
}

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}
        >
          <TextField
            label='Nombre'
            value={selectedUser?.name || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, name: e.target.value })
            }
          />
          <TextField
            label='Email'
            value={selectedUser?.email || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, email: e.target.value })
            }
          />
          <TextField
            label='Teléfono'
            value={selectedUser?.phone || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, phone: e.target.value })
            }
          />
          <TextField
            label='Rol'
            value={selectedUser?.role || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, role: e.target.value })
            }
          />
          <TextField
            label='Empresa'
            value={selectedUser?.company || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, company: e.target.value })
            }
          />
          <TextField
            label='Estado'
            value={selectedUser?.status || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, status: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancelar</Button>
          <Button variant='contained' color='primary' onClick={handleEditUser}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>) 
  }
  export default Table;
