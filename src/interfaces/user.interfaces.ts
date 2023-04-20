import { iAddress, iAddressRequest } from "./address.interface";

export interface iUserRequest {
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  birthdate: Date;
  description: string;
  password: string;
  confirm_password: string;
  is_seller: boolean;
  address: iAddressRequest;
}

export type iUserUpdate = Partial<Omit<iUserRequest, "address">>;

export interface iUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  birthdate: Date;
  description: string;
  is_seller: boolean;
  created_at: Date;
  updated_at: Date;
  address: iAddress;
}

export type iUserNotAddress = Omit<iUser, "address">;
