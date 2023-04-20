import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";

export const isUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await AppDataSource.getRepository(User)
    .findOneByOrFail({ id: req.params.userId })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  req.paramUser = user;
  return next();
};
