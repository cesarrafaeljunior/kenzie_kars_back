import { Request, Response } from "express";
import {
  createCommentService,
  deleteCommentService,
  editCommentService,
} from "../services/comments.services";

export const createCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const comment = await createCommentService(
    req.authUser,
    req.paramAdvertise,
    req.body
  );

  return res.status(201).json(comment);
};

export const editCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const comment = await editCommentService(req.paramComment, req.body);

  return res.status(200).json(comment);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  await deleteCommentService(req.paramComment);

  return res.status(204).json({});
};
