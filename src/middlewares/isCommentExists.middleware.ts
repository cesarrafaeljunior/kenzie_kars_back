import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { Comment } from "../entities/comments.entity";

export const isCommentExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const comment = await AppDataSource.getRepository(Comment)
    .findOneOrFail({
      where: { id: req.params.commentId },
      relations: { user: true },
    })
    .catch(() => {
      throw new AppError("Comment not found", 404);
    });

  req.paramComment = comment;
  return next();
};
