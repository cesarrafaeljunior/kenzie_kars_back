import { Router } from "express";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { loginSchema } from "../schemas/login.schemas";
import { loginController } from "../controllers/login.controllers";

export const loginRoutes = Router();

loginRoutes.post("", bodyValidateMiddleware(loginSchema), loginController);
