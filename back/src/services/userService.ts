import { config } from "../config/validateEnv";
import { AirtableRecord } from "../utils/airtableInterfaces";
import User, { UserFields } from "../models/User";

export const userService = {
  async findUserById(id: string): Promise<AirtableRecord["fields"] | null> {
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

    // Explicitly cast the JSON response to `AirtableRecord`
    const user = (await response.json()) as AirtableRecord;
    return user.fields || null;
  },

  async deleteUserById(id: string): Promise<boolean> {
    const { AIRTABLE_API_KEY, usersTableUrl } = config;

    const response = await fetch(`${usersTableUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete user from Airtable: ${errorText}`);
    }

    return true;
  },

  async updateUserById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const { AIRTABLE_API_KEY, usersTableUrl } = config;

    const response = await fetch(`${usersTableUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update user in Airtable: ${errorText}`);
    }

    const updatedUser = (await response.json()) as AirtableRecord;
    return updatedUser.fields;
  },

  async patchUserById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    const updatedData = { ...existingUser, ...data };

    return this.updateUserById(id, updatedData);
  },  

  async createUser(data: UserFields): Promise<User> {
    const { AIRTABLE_API_KEY, usersTableUrl } = config;

    const response = await fetch(usersTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create user in Airtable: ${errorText}`);
    }

    const newUser = (await response.json()) as User;
    return newUser;
  },

};
 