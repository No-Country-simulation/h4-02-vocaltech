import { Request, Response } from "express";
import getRecords from "./dbConfigAirTable";

// Controlador para obtener registros de una tabla
export async function getTableRecords(req: Request, res: Response) {
  const tableName = req.params.table;

  try {
    const records = await getRecords(tableName);
    res.status(200).json(records);
  } catch (error) {
    console.error(`Error fetching records from table ${tableName}:`, error);
    res.status(500).json({ message: "Error fetching records", error });
  }
}
