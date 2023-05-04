import { AppDataSource } from "../data-source";
import { Advertised_car } from "../entities/adverts.entity";
import { Comment } from "../entities/comments.entity";
import { User } from "../entities/users.entity";
import {
  iComment,
  iCommentRequest,
  iCommentUpdate,
} from "../interfaces/comment.interface";
import { commentResponseSchema } from "../schemas/comments.schemas";

export const createCommentService = async (
  user: User,
  advert: Advertised_car,
  body: iCommentRequest
): Promise<iComment> => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const comment = commentRepo.create({ user, advert, ...body });
  await commentRepo.save(comment);

  const commentValidated = commentResponseSchema.validateSync(comment, {
    stripUnknown: true,
    abortEarly: false,
  });

  return commentValidated;
};

export const editCommentService = async (
  comment: Comment,
  body: iCommentUpdate
): Promise<iComment> => {
  const commentRepo = AppDataSource.getRepository(Comment);

  comment = commentRepo.create({ ...comment, ...body });
  await commentRepo.save(comment);

  const commentValidated = commentResponseSchema.validateSync(comment, {
    stripUnknown: true,
    abortEarly: false,
  });

  return commentValidated;
};

export const deleteCommentService = async (
  comment: Comment
): Promise<Object> => {
  await AppDataSource.getRepository(Comment).remove(comment);
  return {};
};
