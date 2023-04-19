import { Router } from "express";
import {
  createAddressController,
  deleteAddressControler,
  editAddressControler,
  retrieveAddressUserController,
} from "../controllers/address.controllers";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const addressRoutes = Router();

addressRoutes.post("", verifyTokenMiddleware, createAddressController);
addressRoutes.get("", verifyTokenMiddleware, retrieveAddressUserController);
addressRoutes.patch("", verifyTokenMiddleware, editAddressControler);
addressRoutes.delete("", verifyTokenMiddleware, deleteAddressControler);
