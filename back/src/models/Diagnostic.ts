// src/models/Diagnostic.ts
export interface DiagnosticFields {
  Diagnostic: string;	
  InfoFile: string;	
  SoundFile: string;	
  NameCorp: string;	
  DescripCorp: string;	
  Type: 'EMPRESA' | 'EMPRENDEDOR';	
  SelectArea: string;	
  TimeStamp: Date;	
  Status: 'TO DO' | 'IN PROGRESS' | 'DONE';		
  Question1: string;	
  Question2: string;	
  Question3: string;	
  Question4: string;	
  Question5: string;	
  idUser: string;
  idProduct: string;
}
  
export default interface Diagnostic {
  id: string; // Este es el ID generado por Airtable
  fields: DiagnosticFields;
}
  
  
  