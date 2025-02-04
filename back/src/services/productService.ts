import { config } from "../config/validateEnv";
import { AirtableRecord } from "../utils/airtableInterfaces";
import Product, { ProductFields } from "../models/Product";

const fetch = require('node-fetch');

export const productService = {
  async findProductById(id: string): Promise<AirtableRecord["fields"] | null> {
    const { AIRTABLE_API_KEY, productsTableUrl } = config;

    const response = await fetch(`${productsTableUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch product from Airtable: ${errorText}`);
    }

    // Explicitly cast the JSON response to `AirtableRecord`
    const product = (await response.json()) as AirtableRecord;
    return product.fields || null;
  },

  async deleteProductById(id: string): Promise<boolean> {
    const { AIRTABLE_API_KEY, productsTableUrl } = config;

    const response = await fetch(`${productsTableUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete product from Airtable: ${errorText}`);
    }

    return true;
  },

  async updateProductById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const { AIRTABLE_API_KEY, productsTableUrl } = config;

    const response = await fetch(`${productsTableUrl}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update product in Airtable: ${errorText}`);
    }

    const updatedProduct = (await response.json()) as AirtableRecord;
    return updatedProduct.fields;
  },

  async patchProductById(id: string, data: Partial<AirtableRecord["fields"]>): Promise<AirtableRecord["fields"]> {
    const existingProduct = await this.findProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedData = { ...existingProduct, ...data };

    return this.updateProductById(id, updatedData);
  },  

  async createProduct(data: ProductFields): Promise<Product> {
    const { AIRTABLE_API_KEY, productsTableUrl } = config;

    const response = await fetch(productsTableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create product in Airtable: ${errorText}`);
    }

    const newProduct = (await response.json()) as Product;
    return newProduct;
  },

};
 