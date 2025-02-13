import { config } from "../config/validateEnv";
import { AirtableRecord, AirtableRecordDiagnostic, AirtableRecordDiagnosticPatch } from "../utils/airtableInterfaces";
import Diagnostic, { DiagnosticFields } from "../models/Diagnostic";
import { userService } from "./userService";
import { productService } from "./productService";
import { emailService, emailDiagnosticService, emailResponseDiagnosticService } from "./emailService";
import { wappService } from "./wappService";

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

        // Retrieve user data
        const userData1 = await userService.findUserById(newDiagnostic.fields.idUser);
        console.log("userData1: ", userData1);
        if (!userData1) {
            throw new Error(`User with ID ${newDiagnostic.fields.idUser} not found`);
        }

        // Retrieve product data
        const productData = newDiagnostic.fields.idProduct
            ? (Array.isArray(newDiagnostic.fields.idProduct)
                ? newDiagnostic.fields.idProduct
                : [newDiagnostic.fields.idProduct])
            : [];

        console.log("productData: ", productData);

        // Validate user data      
        if (!userData1?.email || !userData1?.name) {
            throw new Error("User email or name is missing.");
        }

        // Send email
        try {
            await emailDiagnosticService.sendDiagnosticEmail(userData1.email, userData1.name, productData);
        } catch (error) {
            console.error("Error sending welcome email:", error);
            throw new Error(`Failed to send welcome email: ${error}`);
        }

        // Send whatsapp template
        try {
            await wappService.sendTemplateAuto(userData1.phone, "hello_world"); 
        } catch (error) {
            console.error("Error sending template:", error);
            throw new Error(`Failed to send welcome email: ${error}`);
        }

        return newDiagnostic;
    },


    async emailDiagnosticById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
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
        const newDiagnostic = updatedDiagnostic as Diagnostic;

        // Retrieve user data
        const userData1 = await userService.findUserById(newDiagnostic.fields.idUser);
        if (!userData1) {
            throw new Error(`User with ID ${newDiagnostic.fields.idUser} not found`);
        }

        // Retrieve product data
        const productData = newDiagnostic.fields.idProduct
            ? (Array.isArray(newDiagnostic.fields.idProduct)
                ? newDiagnostic.fields.idProduct
                : [newDiagnostic.fields.idProduct])
            : [];

        console.log("productData: ", productData);

        // Validate user data      
        if (!userData1?.email || !userData1?.name) {
            throw new Error("User email or name is missing.");
        }

        // Send email
        try {
            await emailResponseDiagnosticService.sendResponseDiagnosticEmail(userData1.email, userData1.name, productData, newDiagnostic.fields.Diagnostic);
            console.log(`Diagnostic email sent to ${userData1.email}`);
        } catch (error) {
            console.error("Error sending welcome email:", error);
            throw new Error(`Failed to send welcome email: ${error}`);
        }

        return updatedDiagnostic.fields;

    },


};
