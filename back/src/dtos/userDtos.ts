export interface UpdateUserDto {
    name: string;
    description: string;
    email: string;
    phone: string;
    company: string;
    active: boolean;
    role: "ADMIN" | "USER";
    password: string;
    status: "ACTIVO" | "INACTIVO";
  }
  
  export interface CreateUserDto {
    name: string;
    description: string;
    email: string;
    phone: string;
    company: string;
    active: boolean;
    role: "ADMIN" | "USER";
    password: string;
    status: "ACTIVO" | "INACTIVO";
  }  