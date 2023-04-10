import { Router } from "express";
import { createUserController, retrieveUserController } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("/:id", retrieveUserController);
userRoutes.patch("/:id");
userRoutes.delete("/:id");
