import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("/:id");
userRoutes.patch("/:id");
userRoutes.delete("/:id");
