import { ObjectSchema } from "yup";
import * as yup from "yup";
import { iAddress, iAddressRequest } from "../interfaces/address.interface";

export const addressRequestSchema: ObjectSchema<iAddressRequest> = yup
  .object()
  .shape({
    cep: yup.string().length(8).required(),
    state: yup.string().max(2).required(),
    city: yup.string().max(50).required(),
    street: yup.string().max(80).required(),
    number: yup.string().max(10).nullable().required(),
    complement: yup.string().nullable().required(),
  });

export const addressResponseSchemaNotUser: ObjectSchema<iAddress> = yup
  .object()
  .shape({
    complement: yup.string().nullable().required(),
    number: yup.string().nullable().required(),
    street: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    cep: yup.string().required(),
    id: yup.string().required(),
  });

export const addressResponseSchema = addressResponseSchemaNotUser.concat(
  yup.object().shape({
    user: yup.object({
      is_seller: yup.boolean().required(),
      phone_number: yup.string().required(),
      cpf: yup.string().required(),
      email: yup.string().email().required(),
      name: yup.string().required(),
      id: yup.string().required(),
    }),
  })
);
