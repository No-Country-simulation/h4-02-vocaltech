import dotenv from "dotenv";

dotenv.config();

console.log("TOKEN_AIRTABLE:", process.env.TOKEN_AIRTABLE);
console.log("AIRTABLE_BASE_ID:", process.env.AIRTABLE_BASE_ID);

export function validateEnv() {
  const apiKey = process.env.TOKEN_AIRTABLE;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error(
      "Missing required environment variables: TOKEN_AIRTABLE or AIRTABLE_BASE_ID"
    );
  }

  return { apiKey, baseId };
}
