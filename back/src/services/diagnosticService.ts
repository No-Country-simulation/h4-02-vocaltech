import { config } from "../config/validateEnv";
import { AirtableRecordDiagnostic, AirtableRecordDiagnosticPatch } from "../utils/airtableInterfaces";
import Diagnostic, { DiagnosticFields } from "../models/Diagnostic";

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

  async updateDiagnosticById(id: string, data: Partial<AirtableRecordDiagnostic["fields"]>): Promise<AirtableRecordDiagnostic["fields"]> {
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

    const updatedDiagnostic = (await response.json()) as AirtableRecordDiagnostic;
    return updatedDiagnostic.fields;
  },

  async patchDiagnosticById(id: string, data: Partial<AirtableRecordDiagnosticPatch["fields"]>): Promise<AirtableRecordDiagnosticPatch["fields"]> {
    const existingDiagnostic = await this.findDiagnosticById(id);
    if (!existingDiagnostic) {
      throw new Error(`Diagnostic with ID ${id} not found`);
    }

    const updatedData = { ...existingDiagnostic, ...data };

    return this.updateDiagnosticById(id, updatedData);
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
    return newDiagnostic;
  },

};
 