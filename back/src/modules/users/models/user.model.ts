export interface User {
    id?: string;
    name: string;
    description?: string;
    email: string;
    phone?: string;
    company?: string;
    active: boolean;
    type: 'ADMIN1' | 'ADMIN2' | 'USER' | 'CONTACT';
    password: string;
  }
  