import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iLogin, iUserRequest } from "../interfaces/user.interfaces";

const ensureIfIsLegalAge = (birthdate: Date) => {
    let date = new Date();
    date = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
    birthdate = new Date(birthdate);
    // @ts-expect-error
    return date - birthdate > 0 ? true : false;
};

export const userRequestSchema: ObjectSchema<iUserRequest> = yup.object().shape({
    name: yup.string().max(100).required(),
    email: yup.string().email().max(100).required(),
    cpf: yup.string().max(11).required(),
    phone_number: yup.string().max(11).required(),
    birthdate: yup.date().required().test(ensureIfIsLegalAge),
    description: yup.string().required(),
    password: yup.string().required(),
    is_seller: yup.boolean().required(),
});

export const userUpdateSchema = userRequestSchema.partial();

// export const userResponseSchema: ObjectSchema<iClientResponse> = yup.object().shape({
//     updatedAt: yup.date().required(),
//     createdAt: yup.date().required(),
//     phone_number: yup.string().min(10).max(11).required(),
//     email: yup.string().email().max(127).required(),
//     last_name: yup.string().max(50).required(),
//     first_name: yup.string().max(50).required(),
//     id: yup.string().uuid().required(),
// });

export const loginSchema: ObjectSchema<iLogin> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
