import {LoginData} from './LoginData';

export interface RegistrationData extends LoginData {
  firstName: string;
  lastName: string;
  role: string;
}
