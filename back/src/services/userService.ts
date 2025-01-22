import { config } from "../config/validateEnv";
import { AirtableResponse } from "../utils/airtableInterfaces";

const fetch = require("node-fetch");

export const userService = {
  async findUserById(id: string): Promise<any | null> {
    const { AIRTABLE_API_KEY, usersTableUrl } = config;

    const response = await fetch(`${usersTableUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch user from Airtable: ${errorText}`);
    }

    const user = await response.json();
    return user.fields || null;
  },
};




// import Airtable, { Table } from "airtable";
// import User from "../models/User";

// // Ensure API Key and Base ID are available
// const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
// const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
//   throw new Error("Missing Airtable API key or Base ID in environment variables.");
// }

// // Configure Airtable
// const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
// const userTable: Table<Record<string, any>> = base("Users"); // Users table

// /**
//  * Service to get a user by ID
//  * @param id - Airtable record ID of the user
//  * @returns Promise<User | null>
//  */
// export const getUserById = async (id: string): Promise<User | null> => {
//     try {
//       const record = await userTable.find(id);
//       return {
//         id: record.id,
//         fields: record.fields as User["fields"],
//       };
//     } catch (error) {
//     //   if (error.statusCode === 404) {
//     //     return null;
//     //   }
//       console.error(`Error in userService.getUserById:`, error);
//       throw new Error(`Unable to fetch user with ID ${id}.`);
//     }
//   };


// /**
//  * Service to delete a user by ID
//  * @param id - Airtable record ID of the user
//  * @returns Promise<void>
//  */
// export const deleteUserById = async (id: string): Promise<void> => {
//   try {
//     await userTable.destroy(id);
//   } catch (error) {
//     console.error(`Error in userService.deleteUserById:`, error);
//     throw new Error(`Unable to delete user with ID ${id}.`);
//   }
// };
