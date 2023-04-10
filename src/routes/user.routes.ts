import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    editUserController,
    retrieveUserController,
} from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("/:id", retrieveUserController);
userRoutes.patch("/:id", editUserController);
userRoutes.delete("/:id", deleteUserController);
