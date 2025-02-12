import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import React, { useMemo, useEffect, useState } from 'react'
import { IUser } from '../../types/User'
import { Edit, Delete } from '@mui/icons-material'
import {
  IconButton,
  Tooltip,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress
} from '@mui/material'
import { mkConfig, generateCsv, download } from 'export-to-csv'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

function Table() {
  const [data, setData] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [exporting, setExporting] = useState(false)

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
      setError('Failed to load data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
              <IconButton
                onClick={() => handleEditClick(row.original)}
                aria-label='Edit user'
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete'>
              <IconButton
                onClick={() => console.log('Delete', row.original)}
                aria-label='Delete user'
              >
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

  const handleExportData = async () => {
    setExporting(true)
    try {
      const csvData = data.map((user) => ({ ...user }))
      const csv = generateCsv(csvConfig)(csvData)
      download(csvConfig)(csv)
    } catch (error) {
      console.error('Error exporting data:', error)
    } finally {
      setExporting(false)
    }
  }

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user)
    setOpenEditModal(true)
  }

  const handleCloseModal = () => {
    setOpenEditModal(false)
    setSelectedUser(null)
  }

  const handleEditUser = async () => {
    if (!selectedUser) return

    try {
      const response = await fetch(
        `https://h4-02-vocaltech.onrender.com/api/airtable/users/${selectedUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              name: selectedUser.name,
              email: selectedUser.email,
              phone: selectedUser.phone,
              role: selectedUser.role,
              company: selectedUser.company,
              status: selectedUser.status
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update user')
      }

      setOpenEditModal(false)
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  if (isLoading) {
    return <div>Cargando usuarios...</div>
  }

  if (error) {
    return <div>{error}</div>
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
          disabled={exporting}
        >
          {exporting ? 'Exporting...' : 'Export All Data'}
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

      <Dialog open={openEditModal} onClose={handleCloseModal}>
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
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button variant='contained' color='primary' onClick={handleEditUser}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Table
