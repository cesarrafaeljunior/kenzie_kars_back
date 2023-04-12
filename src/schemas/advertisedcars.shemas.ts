import * as yup from "yup"

export const advertisedRequest = yup.object().shape({
	mileage: yup.number().positive().required("Mileage is required"),
	price: yup.number().positive().required("Price is required"),
	description: yup.string().required("Description is required"),
	cover_image: yup.string().required("Cover image is required"),
	location: yup.string().required("Location is required"),
	is_avaliable: yup.boolean().required("Availability is required"),
	created_at: yup.date().required("Creation date is required"),
	updated_at: yup.date().required("Update date is required"),
	user: yup.object().shape({}).required("User is required"),
})

export const advertisedSchema = yup.object().shape({
	mileage: yup.number().positive().required("Mileage is required"),
	price: yup.number().positive().required("Price is required"),
	description: yup.string().required("Description is required"),
	cover_image: yup.string().required("Cover image is required"),
	location: yup.string().required("Location is required"),
	is_avaliable: yup.boolean().required("Availability is required"),
	created_at: yup.date().required("Creation date is required"),
	updated_at: yup.date().required("Update date is required"),
	user: yup.object().shape({}).required("User is required"),
	year: yup.object().shape({}).required("Year is required"),
	model: yup.object().shape({}).required("Model is required"),
	fuel: yup.object().shape({}).required("Fuel is required"),
	color: yup.object().shape({}).required("Color is required"),
	brand: yup.object().shape({}).required("Brand is required"),
	galery: yup.array().of(yup.object().shape({})),
	comments: yup.array().of(yup.object().shape({})),
})
