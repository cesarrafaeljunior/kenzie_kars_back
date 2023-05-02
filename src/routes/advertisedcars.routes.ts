import { Router } from "express";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import {
  advertisedRequestSchema,
  advertisedUpdateSchema,
} from "../schemas/advertisedcars.schemas";
import {
  createAdvertisedController,
  deleteAdvertisedController,
  editAdvertisedController,
  retrieveAdvertisedByUserController,
  retrieveAdvertisedController,
  retrieveAllAdvertisedController,
} from "../controllers/advertisedcars.controllers";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { isUserExistsMiddleware } from "../middlewares/isUserExists.middleware";
import { isAdvertiseExistsMiddleware } from "../middlewares/isAdvertiseExists.middleware";

export const advertisedRoutes = Router();

advertisedRoutes.get("", retrieveAllAdvertisedController);
advertisedRoutes.post(
  "",
  verifyTokenMiddleware,
  bodyValidateMiddleware(advertisedRequestSchema),
  createAdvertisedController
);
advertisedRoutes.get(
  "/users/:userId/",
  isUserExistsMiddleware,
  retrieveAdvertisedByUserController
);
advertisedRoutes.get(
  "/:advertId/",
  isAdvertiseExistsMiddleware,
  retrieveAdvertisedController
);
advertisedRoutes.patch(
  "/:advertId/",
  verifyTokenMiddleware,
  isAdvertiseExistsMiddleware,
  bodyValidateMiddleware(advertisedUpdateSchema),
  editAdvertisedController
);
advertisedRoutes.delete(
  "/:advertId/",
  verifyTokenMiddleware,
  isAdvertiseExistsMiddleware,
  deleteAdvertisedController
);
