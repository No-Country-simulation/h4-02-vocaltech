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
  
export interface AirtableRecord {
    id: string;
    fields: {
      name?: string;
      email?: string;
      [key: string]: any; // Allows other dynamic fields
    };
  }  

  export interface AirtableRecordDiagnostic {
    id: string;
    fields: {
      Type?: string;
      idProduct?: string;
      idUsers?: string;
      [key: string]: any; // Allows other dynamic fields
    };
  }    