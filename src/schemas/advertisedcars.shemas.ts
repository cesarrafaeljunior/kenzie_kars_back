import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iAdvertised, iAdvertisedRequest } from "../interfaces/advertised.interfaces";

export const advertisedRequestSchema: ObjectSchema<iAdvertisedRequest> = yup.object().shape({
	mileage: yup.number().positive().required(),
	price: yup.number().positive().required(),
	description: yup.string().required(),
	cover_image: yup.string().max(300).required(),
	location: yup.string().length(8).required(),
	is_avaliable: yup.boolean().required().default(true),
});

export const advertisedUpdateSchema = advertisedRequestSchema.partial();

export const advertisedResponseSchema: ObjectSchema<iAdvertised> = yup.object().shape({
	id: yup.string().required(),
	mileage: yup.number().positive().required(),
	price: yup.number().positive().required(),
	description: yup.string().required(),
	cover_image: yup.string().required(),
	location: yup.string().required(),
	created_at: yup.date().required(),
	updated_at: yup.date().required(),
	is_avaliable: yup.boolean().required(),
});
