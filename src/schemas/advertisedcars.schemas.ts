import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iAdvertisedRequest } from "../interfaces/advertised.interfaces";
import { userResponseSchemaNotAddress } from "./user.schemas";
import {
  galeryRequestSchema,
  galeryResponseSchema,
} from "./sellerGalery.schemas";
import { commentResponseSchema } from "./comments.schemas";

export const advertisedRequestSchema: ObjectSchema<iAdvertisedRequest> = yup
  .object()
  .shape({
    brand: yup.string().max(50).required(),
    model: yup.string().max(50).required(),
    fuel: yup.string().max(20).required(),
    color: yup.string().max(20).required(),
    year: yup.number().positive().required(),
    mileage: yup.number().min(0).required(),
    price: yup.number().positive().required(),
    fipe_price: yup.number().positive().required(),
    description: yup.string().required(),
    cover_image: yup
      .string()
      .url()
      .matches(
        /\.(jpeg|jpg|gif|png)$/i,
        "a URl da imagem deve terminar em jpeg, jpg, gif ou png"
      )
      .max(300)
      .required(),
    location: yup.string().length(8).required(),
    is_avaliable: yup.boolean().required().default(true),
    galery: yup.array().of(galeryRequestSchema).required(),
  });

export const advertisedUpdateSchema = advertisedRequestSchema
  .concat(
    yup.object().shape({
      is_avaliable: yup.boolean().required(),
    })
  )
  .partial();

export const advertisedResponseSchemaNotUser = yup.object().shape({
  galery: yup.array().of(galeryResponseSchema).required(),
  updated_at: yup.date().required(),
  created_at: yup.date().required(),
  is_avaliable: yup.boolean().required(),
  location: yup.string().required(),
  cover_image: yup.string().required(),
  description: yup.string().required(),
  fipe_price: yup.number().required(),
  price: yup.number().required(),
  mileage: yup.number().required(),
  year: yup.mixed().transform(({ year }) => year),
  color: yup.mixed().transform(({ color }) => color),
  fuel: yup.mixed().transform(({ fuel }) => fuel),
  model: yup.mixed().transform(({ model }) => model),
  brand: yup.mixed().transform(({ brand }) => brand),
  id: yup.string().required(),
});

export const advertisedResponseSchema = advertisedResponseSchemaNotUser.concat(
  yup.object().shape({
    user: userResponseSchemaNotAddress,
  })
);

export const advertisedListResponseSchema = yup
  .array()
  .of(advertisedResponseSchema);

export const advertiseListByUserResponseSchema =
  userResponseSchemaNotAddress.concat(
    yup.object().shape({
      adverts: yup
        .array()
        .of(
          advertisedResponseSchemaNotUser.concat(
            yup
              .object()
              .shape({ comments: yup.array().of(commentResponseSchema) })
          )
        ),
    })
  );
