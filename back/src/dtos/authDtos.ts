export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
  company: string;
}
  
export interface LoginUserDto {
  email: string;
  password: string;
}
