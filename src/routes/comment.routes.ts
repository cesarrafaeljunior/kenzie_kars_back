import { Router } from "express";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { isAdvertiseExistsMiddleware } from "../middlewares/isAdvertiseExists.middleware";
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
} from "../controllers/comments.controllers";
import {
  commentRequestSchema,
  commentUpdateSchema,
} from "../schemas/comments.schemas";
import { isCommentExistsMiddleware } from "../middlewares/isCommentExists.middleware";

export const commentsRoutes = Router();

commentsRoutes.post(
  "",
  verifyTokenMiddleware,
  isAdvertiseExistsMiddleware,
  bodyValidateMiddleware(commentRequestSchema),
  createCommentController
);

commentsRoutes.patch(
  "/:commentId/",
  verifyTokenMiddleware,
  isAdvertiseExistsMiddleware,
  isCommentExistsMiddleware,
  bodyValidateMiddleware(commentUpdateSchema),
  editCommentController
);

commentsRoutes.delete(
  "/:commentId/",
  verifyTokenMiddleware,
  isAdvertiseExistsMiddleware,
  isCommentExistsMiddleware,
  deleteCommentController
);
