import axios from "axios";

/**
 * Obtiene los datos de los leads desde el microservicio.
 * @returns Una lista de correos electrónicos extraídos de los leads.
 */
export const getEmailsFromLeads = async (): Promise<string[]> => {
  try {
    const response = await axios.get("http://microservice-leads:3000/leads"); // URL del microservicio
    const emails = response.data.map((lead: any) => lead.email); // Extrae los emails
    return emails;
  } catch (error) {
    console.error("Error fetching leads from microservice:", error);
    throw new Error("Failed to fetch leads data");
  }
};

