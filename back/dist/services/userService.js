"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const validateEnv_1 = require("../config/validateEnv");
const fetch = require("node-fetch");
exports.userService = {
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { AIRTABLE_API_KEY, usersTableUrl } = validateEnv_1.config;
            const response = yield fetch(`${usersTableUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`Failed to fetch user from Airtable: ${errorText}`);
            }
            const user = yield response.json();
            return user.fields || null;
        });
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
