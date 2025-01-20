import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
  MRT_Row,
} from "material-react-table";
import React, { useMemo, useEffect, useState } from "react";
import { IUser } from "../types/User";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

function Table() {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://h4-02-vocaltech.onrender.com/api/airtable/users"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const apiData = await response.json();

        const transformedData = apiData.map((item: any) => ({
          id: item.id,
          email: item.fields.email,
          name: item.fields.name,
          active: item.fields.active,
          company: item.fields.company,
          description: item.fields.description,
          phone: item.fields.phone,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        muiTableBodyCellProps: { style: { color: "black" } },
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        muiTableBodyCellProps: { style: { color: "black" } },
        enableHiding: false,
      },
      {
        accessorKey: "company",
        header: "Company",
        muiTableBodyCellProps: { style: { color: "black" } },
        enableHiding: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        muiTableBodyCellProps: { style: { color: "black" } },
        enableHiding: false,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        muiTableBodyCellProps: { style: { color: "black" } },
        enableHiding: false,
      },
      {
        id: "actions", // Columna personalizada
        header: "Actions",
        Cell: ({ row }: { row: MRT_Row<IUser> }) => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Tooltip title="Edit">
              <IconButton onClick={() => console.log("Edit", row.original)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => console.log("Delete", row.original)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable<IUser>({
    columns,
    data,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  if (isLoading) {
    return <div>Cargando usuarios...</div>;
  }

  return <MaterialReactTable columns={columns} data={data} table={table}/>;
}
export default Table;
