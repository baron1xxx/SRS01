export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tel?: string;
  country?: string;
  city?: string;
  avatar?: string;
  role: string;
}
