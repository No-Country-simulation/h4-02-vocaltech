export interface AirtableRecordUser {
  id: string;
  fields: {
    name: string;
    email: string;
    password: string;
    phone: string;
    company: string;
    [key: string]: any; // Permite otros campos dinámicos si es necesario
  };
}
  
export interface AirtableResponse {
  records: AirtableRecordUser[];
}
  
  