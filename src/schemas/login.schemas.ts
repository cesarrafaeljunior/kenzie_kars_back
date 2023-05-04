import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iLogin } from "../interfaces/login.interfaces";

export const loginSchema: ObjectSchema<iLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
