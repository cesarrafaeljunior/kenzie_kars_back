import * as yup from "yup";
import { ObjectSchema } from "yup";
import {
  iUser,
  iUserNotAddress,
  iUserRequest,
} from "../interfaces/user.interfaces";

const ensureIfIsLegalAge = (birthdate: Date) => {
  if (!birthdate) {
    return true;
  }
  let date = new Date();
  date = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
  birthdate = new Date(birthdate);
  // @ts-expect-error

  return date - birthdate > 18 ? true : false;
};

export const userRequestSchema: ObjectSchema<iUserRequest> = yup
  .object()
  .shape({
    name: yup.string().max(100).required(),
    email: yup.string().email().max(100).required(),
    cpf: yup.string().max(11).required(),
    phone_number: yup.string().max(11).required(),
    birthdate: yup
      .date()
      .required()
      .test("Legal age", "Come back when you're 18 years", ensureIfIsLegalAge),
    description: yup.string().required(),
    password: yup.string().required(),
    is_seller: yup.boolean().required(),
    address: yup.object({
      cep: yup.string().max(8).required(),
      state: yup.string().max(2).required(),
      city: yup.string().max(50).required(),
      street: yup.string().max(80).required(),
      number: yup.string().max(10).required(),
      complement: yup.string().required(),
    }),
  });

export const userUpdateSchema = userRequestSchema.deepPartial();

export const userResponseSchema: ObjectSchema<iUser> = yup.object().shape({
  updated_at: yup.date().required(),
  created_at: yup.date().required(),
  is_seller: yup.boolean().required(),
  description: yup.string().required(),
  birthdate: yup.date().required(),
  phone_number: yup.string().required(),
  cpf: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  id: yup.string().required(),
  address: yup.object().shape({
    id: yup.string().required(),
    cep: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string().required(),
  }),
});

export const userResponseSchemaNotAddress: ObjectSchema<iUserNotAddress> = yup
  .object()
  .shape({
    updated_at: yup.date().required(),
    created_at: yup.date().required(),
    is_seller: yup.boolean().required(),
    description: yup.string().required(),
    birthdate: yup.date().required(),
    phone_number: yup.string().required(),
    cpf: yup.string().required(),
    email: yup.string().email().required(),
    name: yup.string().required(),
    id: yup.string().required(),
  });
