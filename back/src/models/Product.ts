// src/models/Product.ts
export interface ProductFields {
  NameProduct: string;
  Description: string;
  Category: string;
  Status: 'ACTIVO' | 'INACTIVO'| 'SUSPENDIDO';
  Question1: string;
  Question2: string;
}
  
export default interface Product {
  id: string; // Este es el ID generado por Airtable
  fields: ProductFields;
}
  
  
  