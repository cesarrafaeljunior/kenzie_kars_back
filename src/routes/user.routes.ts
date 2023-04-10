import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    editUserController,
    retrieveUserController,
} from "../controllers/user.controllers";
import { isUserExistsMiddleware } from "../middlewares/isUserExists.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("/:id", isUserExistsMiddleware, retrieveUserController);
userRoutes.patch("/:id", isUserExistsMiddleware, editUserController);
userRoutes.delete("/:id", isUserExistsMiddleware, deleteUserController);
