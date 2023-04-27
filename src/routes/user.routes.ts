import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  editUserController,
  resetPasswordController,
  retrieveUserController,
  retrieveUserProfileController,
  sendResetEmailPasswordController,
} from "../controllers/user.controllers";
import { isUserExistsMiddleware } from "../middlewares/isUserExists.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { userRequestSchema, userUpdateSchema } from "../schemas/user.schemas";

export const userRoutes = Router();

userRoutes.post(
  "",
  bodyValidateMiddleware(userRequestSchema),
  createUserController
);
userRoutes.get(
  "/profile",
  verifyTokenMiddleware,
  retrieveUserProfileController
);
userRoutes.get(
  "/:userId",
  verifyTokenMiddleware,
  isUserExistsMiddleware,
  retrieveUserController
);
userRoutes.patch(
  "/:userId",
  verifyTokenMiddleware,
  isUserExistsMiddleware,
  bodyValidateMiddleware(userUpdateSchema),
  editUserController
);
userRoutes.delete(
  "/:userId",
  verifyTokenMiddleware,
  isUserExistsMiddleware,
  deleteUserController
);
userRoutes.post("/resetPassword", sendResetEmailPasswordController);
userRoutes.patch("/resetPassword/:token", resetPasswordController);
