import { Router } from "express"
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware"
import { advertisedRequestSchema } from "../schemas/advertisedcars.shemas"
import {
	createAdvertisedController,
	retrieveAdvertisedController,
} from "../controllers/advertisedcars.controllers"

export const advertisedRoutes = Router()

advertisedRoutes.post(
	"",
	bodyValidateMiddleware(advertisedRequestSchema),
	createAdvertisedController
)
advertisedRoutes.get("/:userID/", retrieveAdvertisedController)
