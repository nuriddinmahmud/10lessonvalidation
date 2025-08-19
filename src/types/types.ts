export interface IData {
  id?: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: 'male' | 'female' | 'prefer not to say'; 
}

export type IFormData = IData;
