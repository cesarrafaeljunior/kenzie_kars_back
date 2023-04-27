import * as yup from "yup";
import { ObjectSchema } from "yup";
import {
  iUser,
  iUserNotAddress,
  iUserRequest,
} from "../interfaces/user.interfaces";
import {
  addressRequestSchema,
  addressResponseSchemaNotUser,
} from "./addess.schemas";

const ensureIfIsLegalAge = (birthdate: Date) => {
  if (!birthdate) {
    return true;
  }

  let date = new Date();
  date = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
  birthdate = new Date(birthdate);
  // @ts-expect-error
  return date - birthdate > 0 ? true : false;
};

const userRequestSchemaNotAddress: ObjectSchema<Omit<iUserRequest, "address">> =
  yup.object().shape({
    name: yup.string().max(100).required(),
    email: yup.string().email().max(100).required(),
    cpf: yup.string().length(11).required(),
    phone_number: yup.string().min(10).max(11).required(),
    birthdate: yup
      .date()
      .required()
      .test("Legal age", "Come back when you're 18 years", ensureIfIsLegalAge),
    description: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords are not the same. Try again!")
      .required(),
    is_seller: yup.boolean().required(),
    reset_token: yup.string().nullable(),
  });

export const userRequestSchema: ObjectSchema<iUserRequest> =
  userRequestSchemaNotAddress.concat(
    yup.object().shape({
      address: addressRequestSchema,
    })
  );

export const userUpdateSchema = userRequestSchemaNotAddress.partial();

export const userResponseSchema: ObjectSchema<iUser> = yup.object().shape({
  address: addressResponseSchemaNotUser,
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
  reset_token: yup.string().nullable(),
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
    reset_token: yup.string().nullable(),
  });
