export interface IUser {
  id: string
  email: string
  name: string
  active: boolean
  company: string
  description: string
  phone: string
  role: string
  status: string
  Diagnostic: string
  [key: string]: any;
}
