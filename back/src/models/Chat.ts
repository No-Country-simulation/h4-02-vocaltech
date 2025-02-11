// src/models/Chat.ts
export interface ChatFields {
    Admin: string;
    Notes: string;
    Assignee: string;
    messageId: string;
    userId: string;
    userName: string;
    message: string;
    messageType: 'text' | 'image'| 'audio' | 'video'| 'document' | 'location'| 'sticker';
    timestamp: Date;
    direction: 'sent' | 'received';
    status: 'delivered' | 'read'| 'failed';
    mediaUrl: string;
    chatSessionId: string;
    responseToMessageId: string;
    labels: 'tech' | 'vocal';
    Phone: string;
}
  
export default interface Chat {
  id: string; // Este es el ID generado por Airtable
  fields: ChatFields;
}
  
  
  