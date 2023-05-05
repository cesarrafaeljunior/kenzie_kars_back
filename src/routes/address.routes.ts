import { Router } from "express";
import {
  createAddressController,
  deleteAddressControler,
  editAddressControler,
  retrieveAddressUserController,
} from "../controllers/address.controllers";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { addressRequestSchema } from "../schemas/addess.schemas";

export const addressRoutes = Router();

addressRoutes.post(
  "",
  bodyValidateMiddleware(addressRequestSchema),
  verifyTokenMiddleware,
  createAddressController
);
addressRoutes.get("", verifyTokenMiddleware, retrieveAddressUserController);
addressRoutes.patch("", verifyTokenMiddleware, editAddressControler);
addressRoutes.delete("", verifyTokenMiddleware, deleteAddressControler);
