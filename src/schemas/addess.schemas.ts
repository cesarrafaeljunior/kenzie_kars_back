import { ObjectSchema } from "yup";
import * as yup from "yup";
import { iAddress } from "../interfaces/address.interface";

export const addressResponseSchema: ObjectSchema<iAddress> = yup
  .object()
  .shape({
    id: yup.string().required(),
    cep: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().required(),
    user: yup.object({
      is_seller: yup.boolean().required(),
      phone_number: yup.string().required(),
      cpf: yup.string().required(),
      email: yup.string().email().required(),
      name: yup.string().required(),
      id: yup.string().required(),
    }),
  });
