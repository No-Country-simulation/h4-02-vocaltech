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
      idUser?: string;
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
      Type: 'EMPRESA' | 'EMPRENDEDOR';	
      SelectArea?: string;	
    //   TimeStamp: Date;	
      Status?: string;		
      Question1?: string;	
      Question2?: string;	
      Question3?: string;	
      Question4?: string;	
      Question5?: string;	
      idUser?: string;
      idProduct?: string;

    };
  } 

  export interface AirtableRecordLeadPatch {
    id: string;
    fields: {
        Lead: string;
        Status: 'Request' | 'Negotiation'| 'Approval' | 'Excecuted' | 'Todo';
        Notes: string;
        Partner: string;
        LastContact: string;
        idUser: string;
        idDiagnostic: string;
        Type: 'EMPRESA' | 'EMPRENDEDOR';	
    };
} 

