import { config } from "../config/validateEnv";
import { AirtableRecord, AirtableRecordDiagnostic, AirtableRecordDiagnosticPatch } from "../utils/airtableInterfaces";
import Diagnostic, { DiagnosticFields } from "../models/Diagnostic";
import { productService } from "./productService";
import { emailDiagnoticService } from "./emailService";

const fetch = require('node-fetch');

export const diagnosticService = {
  async findDiagnosticById(id: string): Promise<AirtableRecordDiagnostic["fields"] | null> {
    const { AIRTABLE_API_KEY, diagnosticsTableUrl } = config;

    const response = await fetch(`${diagnosticsTableUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch diagnostic from Airtable: ${errorText}`);
    }

    // Explicitly cast the JSON response to `AirtableRecord`
    const diagnostic = (await response.json()) as AirtableRecordDiagnostic;
    return diagnostic.fields || null;
  },

  async deleteDiagnosticById(id: string): Promise<boolean> {
    const { AIRTABLE_API_KEY, diagnosticsTableUrl } = config;

    const response = await fetch(`${diagnosticsTableUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete diagnostic from Airtable: ${errorText}`);
    }

    return true;
  },

  async updateDiagnosticById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const { AIRTABLE_API_KEY, diagnosticsTableUrl } = config;

    const response = await fetch(`${diagnosticsTableUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update diagnostic in Airtable: ${errorText}`);
    }

    const updatedDiagnostic = (await response.json()) as AirtableRecord;
    return updatedDiagnostic.fields;
  },

  async patchDiagnosticById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const existingDiagnostic = await this.findDiagnosticById(id);
    if (!existingDiagnostic) {
      throw new Error(`Diagnostic with ID ${id} not found`);
    }

    const updatedData = { ...existingDiagnostic, ...data };

    // return this.updateDiagnosticById(id, updatedData);
 
    const { AIRTABLE_API_KEY, diagnosticsTableUrl } = config;

    const response = await fetch(`${diagnosticsTableUrl}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update diagnostic in Airtable: ${errorText}`);
    }

    const updatedDiagnostic = (await response.json()) as AirtableRecordDiagnosticPatch;
    return updatedDiagnostic.fields;
    
  },  

  async createDiagnostic(data: DiagnosticFields): Promise<Diagnostic> {
    const { AIRTABLE_API_KEY, diagnosticsTableUrl } = config;

    const response = await fetch(diagnosticsTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create diagnostic in Airtable: ${errorText}`);
    }

    const newDiagnostic = (await response.json()) as Diagnostic;
  /*  
    // Obtener información del producto seleccionado. ARREGLAR LA FUNCION
    const product = await productService.findProductById(data.idProduct);

    if (!product) {
      throw new Error(`Producto con ID ${data.idProduct} no encontrado`);
    }

    // Enviar correo con recomendaciones basadas en el producto
    await emailDiagnoticService.sendDiagnosticEmail(data.idUser, data.Diagnostic, product.fields); */

    return newDiagnostic;
  },

};
 