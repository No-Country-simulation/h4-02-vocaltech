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
        accessorKey: "DescripCorp",
        header: "DescripCorp",
      },
      {
        accessorKey: "SelectArea",
        header: "SelectArea",
      },
      {
        accessorKey: "InfoFile",
        header: "InfoFile",
      },
      {
        accessorKey: "SoundFile",
        header: "SoundFile",
      },
      {
        accessorKey: "TimeStamp",
        header: "TimeStamp",
      },
      {
        accessorKey: "Status",
        header: "Status",
      },
      {
        accessorKey: "Question1",
        header: "Question1",
      },
      {
        accessorKey: "Question2",
        header: "Question2",
      },
      {
        accessorKey: "Question3",
        header: "Question3",
      },
      {
        accessorKey: "Question4",
        header: "Question4",
      },
      {
        accessorKey: "Question5",
        header: "Question5",
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
    />
  );
}

export default DiagnosticTable;
