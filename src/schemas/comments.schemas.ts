import * as yup from "yup";
import { ObjectSchema } from "yup";
import { userResponseSchemaNotAddress } from "./user.schemas";
import {
  iComment,
  iCommentRequest,
  iCommentUpdate,
} from "../interfaces/comment.interface";

export const commentRequestSchema: ObjectSchema<iCommentRequest> = yup
  .object()
  .shape({
    description: yup.string().required(),
  });

export const commentUpdateSchema: ObjectSchema<iCommentUpdate> =
  commentRequestSchema.partial();

export const commentResponseSchema: ObjectSchema<iComment> = yup
  .object()
  .shape({
    user: userResponseSchemaNotAddress,
    updated_at: yup.date().required(),
    created_at: yup.date().required(),
    description: yup.string().required(),
    id: yup.string().required(),
  });
