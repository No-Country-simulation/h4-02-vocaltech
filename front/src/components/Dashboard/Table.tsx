import {
    MaterialReactTable,
    type MRT_ColumnDef,
    useMaterialReactTable,
    MRT_Row
  } from 'material-react-table'
  import React, { useMemo, useEffect, useState } from 'react'
  import { IUser } from '../../types/User'
  import { Edit, Delete } from '@mui/icons-material'
  import {
    IconButton,
    Tooltip,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
  } from '@mui/material'
  import { mkConfig, generateCsv, download } from 'export-to-csv'
  import FileDownloadIcon from '@mui/icons-material/FileDownload'
  
  import WhatsAppChatDialog from './WhatsAppChatDialog';
  import { FaWhatsapp } from 'react-icons/fa';
  
  function Table() {
    const [data, setData] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openWhatsAppModal, setOpenWhatsAppModal] = useState(false);
  
    useEffect(() => {
      fetchUsers()
    }, [])
  
    const fetchUsers = async () => {
      setIsLoading(true)
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
  
    const handleDeleteUser = async (id: string) => {
      if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?'))
        return
  
      try {
        const response = await fetch(
          `https://h4-02-vocaltech.onrender.com/api/user/${id}`,
          { method: 'DELETE' }
        )
        if (!response.ok) {
          throw new Error('Error al eliminar el usuario')
        }
        setData((prevData) => prevData.filter((user) => user.id !== id))
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  
    const handleEditUser = async () => {
      if (!selectedUser || !selectedUser.id) return
  
      const updatedData: any = {}
  
      if (selectedUser.phone) updatedData.phone = selectedUser.phone
      if (selectedUser.email) updatedData.email = selectedUser.email
      if (selectedUser.name) updatedData.name = selectedUser.name
      if (selectedUser.role) updatedData.role = selectedUser.role
      if (selectedUser.company) updatedData.company = selectedUser.company
      if (selectedUser.status) updatedData.status = selectedUser.status
  
      try {
        const response = await fetch(
          `https://h4-02-vocaltech.onrender.com/api/user/${selectedUser.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
          }
        )
  
        const responseData = await response.json()
  
        if (!response.ok) {
          throw new Error('Error al actualizar el usuario')
        }
  
        setData((prevData) =>
          prevData.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedData } : user
          )
        )
  
        setOpenEditModal(false)
      } catch (error) {
        console.error('Error al actualizar usuario:', error)
      }
    }
  
    const handleRowDoubleClick = (row: MRT_Row<IUser>) => {
      setSelectedUser(row.original);
      setOpenWhatsAppModal(true);
    };
  
  
  
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
          id: 'actions', // Columna personalizada
          header: 'Actions',
          Cell: ({ row }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Tooltip title='Edit'>
                <IconButton
                  onClick={() => {
                    setSelectedUser(row.original)
                    setOpenEditModal(true)
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete'>
                <IconButton onClick={() => handleDeleteUser(row.original.id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
  
              <Tooltip title='WhatsApp'>
                <IconButton
                  onClick={() => {
                    setSelectedUser(row.original);
                    setOpenWhatsAppModal(true);
                  }}
                >
                  <FaWhatsapp color='green' />
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
      const csv = generateCsv(csvConfig)(data)
      download(csvConfig)(csv)
    }
  
    const handleExportRows = (rows: MRT_Row<IUser>[]) => {
      const rowData = rows.map((row) => row.original)
      const csv = generateCsv(csvConfig)(rowData)
      download(csvConfig)(csv)
    }
  
    const table = useMaterialReactTable<IUser>({
      columns,
      data,
      enableRowSelection: true,
      enableColumnOrdering: true,
      enableGlobalFilter: true,
      initialState: {
        pagination: {
          pageSize: 10,
          pageIndex: 0
        }
      },
      renderTopToolbarCustomActions: ({ table }) => (
        <>
          <Box
            sx={{
              display: 'flex',
              gap: '16px',
              padding: '8px',
              flexWrap: 'wrap'
            }}
          />
          <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
            Exportar tabla
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Exportar filas
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Exportar filas seleccionadas
          </Button>
        </>
      )
    })
  
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
          initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}
  
          getRowId={(row) => row.id}
          muiTableBodyRowProps={({ row }) => ({
            onDoubleClick: () => handleRowDoubleClick(row),
            style: { cursor: 'pointer' }
          })}
  
        />
  
          <WhatsAppChatDialog
          open={openWhatsAppModal}
          onClose={() => setOpenWhatsAppModal(false)}
          phone={selectedUser?.phone || ''}
          />
  
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
      </>
    )
  }
  export default Table
