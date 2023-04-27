import * as yup from "yup";
import { ObjectSchema } from "yup";
import {
  iSellerGalery,
  iSellerGaleryRequest,
} from "../interfaces/sellerGalery.interface";

export const galeryRequestSchema: ObjectSchema<iSellerGaleryRequest> = yup
  .object()
  .shape({
    image: yup
      .string()
      .url()
      .matches(
        /\.(jpeg|jpg|gif|png)$/i,
        "a URl da imagem deve terminar em jpeg, jpg, gif ou png"
      )
      .max(300)
      .required(),
  });

export const galeryResponseSchema: ObjectSchema<iSellerGalery> = yup
  .object()
  .shape({
    image: yup.string().required(),
    id: yup.string().required(),
  });
