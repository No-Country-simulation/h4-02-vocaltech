// src/models/Lead.ts
export interface LeadFields {
  Lead: string;
  Status: 'Request' | 'Negotiation'| 'Approval' | 'Excecuted' | 'Todo';
  Notes: string;
  Partner: string;
  LastContact: string;
  idUser: string;
  idDiagnostic: string;
  Type: 'EMPRESA' | 'EMPRENDEDOR';	
  TimeStart: Date;
  TimeEnd: Date;
}
  
export default interface Lead {
  id: string; // Este es el ID generado por Airtable
  fields: LeadFields;
}
  
  
  