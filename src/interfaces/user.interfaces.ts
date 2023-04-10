export interface iUserRequest {
    name: string;
    email: string;
    cpf: string;
    phone_number: string;
    birthdate: Date;
    description: string;
    password: string;
    is_seller: boolean;
}

export type iUserUpdate = Partial<iUserRequest>;
