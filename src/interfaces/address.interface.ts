export interface iAddressRequest {
  cep: string;
  state: string;
  city: string;
  street: string;
  number?: string;
  complement?: string;
}

export type iAddressUpdate = Partial<iAddressRequest>;

export interface iAddress extends iAddressRequest {
  id: string;
}

export interface iAddressPostResponse extends iAddress {
  user: {
    is_seller: boolean;
    phone_number: string;
    cpf: string;
    email: string;
    name: string;
    id: string;
  };
}
