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

  export interface AirtableRecordDiagnosticPatch {
    id: string;
    fields: {
      Diagnostic?: string;	
      InfoFile?: string;	
      SoundFile?: string;	
      NameCorp?: string;	
      DescripCorp?: string;	
      Type?: string;	
      SelectArea?: string;	
    //   TimeStamp: Date;	
      Status?: string;		
      Question1?: string;	
      Question2?: string;	
      Question3?: string;	
      Question4?: string;	
      Question5?: string;	
      idUsers?: string;
      idProduct?: string;

    };
  } 