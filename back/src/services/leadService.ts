import { config } from "../config/validateEnv";
import { AirtableRecord, AirtableRecordLeadPatch } from "../utils/airtableInterfaces";
import Lead, { LeadFields } from "../models/Lead";

const fetch = require('node-fetch');

export const leadService = {
  async findLeadById(id: string): Promise<AirtableRecord["fields"] | null> {
    const { AIRTABLE_API_KEY, leadsTableUrl } = config;

    const response = await fetch(`${leadsTableUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch lead from Airtable: ${errorText}`);
    }

    // Explicitly cast the JSON response to `AirtableRecord`
    const lead = (await response.json()) as AirtableRecord;
    return lead.fields || null;
  },

  async deleteLeadById(id: string): Promise<boolean> {
    const { AIRTABLE_API_KEY, leadsTableUrl } = config;

    const response = await fetch(`${leadsTableUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete lead from Airtable: ${errorText}`);
    }

    return true;
  },

  async updateLeadById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const { AIRTABLE_API_KEY, leadsTableUrl } = config;

    const response = await fetch(`${leadsTableUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update lead in Airtable: ${errorText}`);
    }

    const updatedLead = (await response.json()) as AirtableRecord;
    return updatedLead.fields;
  },

  async patchLeadById(id: string, data: Partial<AirtableRecordLeadPatch["fields"]>): Promise<AirtableRecordLeadPatch["fields"]> {
    const existingLead = await this.findLeadById(id);
    if (!existingLead) {
      throw new Error(`Lead with ID ${id} not found`);
    }

    const updatedData = { ...existingLead, ...data };

    // return this.updateLeadById(id, updatedData);

    const { AIRTABLE_API_KEY, leadsTableUrl } = config;

    const response = await fetch(`${leadsTableUrl}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update lead in Airtable: ${errorText}`);
    }

    const updatedLead = (await response.json()) as AirtableRecordLeadPatch;
    return updatedLead.fields;
  },  

  async createLead(data: LeadFields): Promise<Lead> {
    const { AIRTABLE_API_KEY, leadsTableUrl } = config;

    const response = await fetch(leadsTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create lead in Airtable: ${errorText}`);
    }

    const newLead = (await response.json()) as Lead;
    return newLead;
  },

};
 