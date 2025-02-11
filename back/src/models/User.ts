// src/models/User.ts
export interface UserFields {
  name: string;
  phone: string;
  email: string;
  role: 'ADMIN' | 'USER';
  company: string;
  password: string;
  description: string;
  status: 'ACTIVO' | 'INACTIVO';
  active: boolean;
}
  
export default interface User {
  id: string; // Este es el ID generado por Airtable
  fields: UserFields;
}
  
  
  