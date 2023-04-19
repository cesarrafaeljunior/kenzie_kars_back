import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iAdvertisedRequest } from "../interfaces/advertised.interfaces";

export const advertisedRequestSchema: ObjectSchema<iAdvertisedRequest> = yup
  .object()
  .shape({
    title: yup.string().max(100).required(),
    brand: yup.string().max(50).required(),
    model: yup.string().max(50).required(),
    fuel: yup.string().max(20).required(),
    color: yup.string().max(20).required(),
    year: yup.number().positive().required(),
    mileage: yup.number().min(0).required(),
    price: yup.number().positive().required(),
    description: yup.string().required(),
    cover_image: yup.string().max(300).required(),
    location: yup.string().length(8).required(),
    is_avaliable: yup.boolean().required().default(true),
  });

export const advertisedUpdateSchema = advertisedRequestSchema
  .concat(
    yup.object().shape({
      is_avaliable: yup.boolean().required(),
    })
  )
  .partial();

export const advertisedResponseSchema = yup.object().shape({
  updated_at: yup.date().required(),
  created_at: yup.date().required(),
  is_avaliable: yup.boolean().required(),
  location: yup.string().required(),
  cover_image: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  mileage: yup.number().required(),
  year: yup.mixed().transform(({ year }) => year),
  color: yup.mixed().transform(({ color }) => color),
  fuel: yup.mixed().transform(({ fuel }) => fuel),
  model: yup.mixed().transform(({ model }) => model),
  brand: yup.mixed().transform(({ brand }) => brand),
  title: yup.string().required(),
  id: yup.string().required(),
});
