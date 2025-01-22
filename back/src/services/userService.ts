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

