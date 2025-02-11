import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import React, { useMemo, useEffect, useState } from "react";
import { IDiagnostic } from "../../types/Diagnostic";
import { mkConfig, generateCsv, download } from 'export-to-csv'
import { IconButton, Tooltip, Box, Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const DiagnosticTable = () => {
  const [data, setData] = useState<IDiagnostic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://h4-02-vocaltech.onrender.com/api/airtable/diagnostics"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const apiData = await response.json();

        const transformedData = apiData.map((item: any) => ({
          idUser: item.idUser,
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
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching diagnostics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo<MRT_ColumnDef<IDiagnostic>[]>(
    () => [
      {
        accessorKey: "Type",
        header: "Type",
        muiTableBodyCellProps: { style: { color: "black" } },
      },
      {
        accessorKey: "SelectArea",
        header: "Área",
      },
      {
        accessorKey: "Status",
        header: "Estado",
      },
      {
        accessorKey: "Question1",
        header: "Pregunta 1",
      },
      {
        accessorKey: "Question2",
        header: "Pregunta 2",
      },
      {
        accessorKey: "Question3",
        header: "Pregunta 3",
      },
      {
        accessorKey: "Question4",
        header: "Pregunta 4",
      },
      {
        accessorKey: "Question5",
        header: "Pregunta 5",
      },
      {
        accessorKey: "DescripCorp",
        header: "Descripción",
      },
      {
        accessorKey: "InfoFile",
        header: "PDF",
      },
      {
        accessorKey: "SoundFile",
        header: "Audio",
      },
    ],
    []
  );

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csvData = data.map((diagnostic) => ({
          ...diagnostic
        }))
        const csv = generateCsv(csvConfig)(csvData)
        download(csvConfig)(csv)
      }
  

  const table = useMaterialReactTable<IDiagnostic>({
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
          Export All Data
        </Button>
      </>
    )
  })

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
      }
    }
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
  );
}

export default DiagnosticTable;
