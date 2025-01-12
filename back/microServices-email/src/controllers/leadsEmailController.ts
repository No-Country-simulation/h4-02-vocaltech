import { Request, Response } from "express";
import { getEmailsFromLeads } from "../services/leadsEmailService";

export const fetchEmailsFromLeads = async (req: Request, res: Response): Promise<Response> => {
  try {
    const emails = await getEmailsFromLeads(); // Usa el servicio para obtener los emails
    return res.status(200).json({ emails });
  } catch (error) {
    console.error("Error in fetchEmailsFromLeads:", error);
    return res.status(500).json({ message: "Failed to fetch emails", error });
  }
};




