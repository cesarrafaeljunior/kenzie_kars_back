import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    editUserController,
    retrieveUserController,
} from "../controllers/user.controllers";
import { isUserExistsMiddleware } from "../middlewares/isUserExists.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("/:id", verifyTokenMiddleware, isUserExistsMiddleware, retrieveUserController);
userRoutes.patch("/:id", verifyTokenMiddleware, isUserExistsMiddleware, editUserController);
userRoutes.delete("/:id", verifyTokenMiddleware, isUserExistsMiddleware, deleteUserController);
