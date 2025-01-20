import Airtable from 'airtable';
import dotenv from 'dotenv';
import { Table } from 'airtable';

// Load environment variables
dotenv.config();

console.log('Airtable API Key:', process.env.AIRTABLE_API_KEY);
console.log('Airtable Base ID:', process.env.AIRTABLE_BASE_ID);

// Ensure API Key and Base ID are available
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  throw new Error("Missing Airtable API key or Base ID in environment variables.");
}

// Configure Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

export const userTable: Table<Record<string, any>> = base('Users');  // Export the Users table
export const contactTable = base('Contacts'); // New export for Contacts table
export const interactionTable = base('Interactions'); // New export for Interactions table

// Function to delete a user by ID
export const deleteUserById = async (id: string): Promise<void> => {
    try {
      await userTable.destroy(id);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  };