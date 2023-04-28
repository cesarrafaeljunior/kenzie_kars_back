import { InferType } from "yup";
import { advertisedResponseSchema } from "../schemas/advertisedcars.schemas";
import { iSellerGaleryRequest } from "./sellerGalery.interface";

export type iAdvertised = InferType<typeof advertisedResponseSchema>;

export interface iAdvertisedRequest {
  brand: string;
  model: string;
  fuel: string;
  color: string;
  year: number;
  mileage: number;
  price: number;
  fipe_price: number;
  description: string;
  cover_image: string;
  location: string;
  is_avaliable: boolean;
  galery: iSellerGaleryRequest[];
}

export type iAdvertisedUpdate = Partial<iAdvertisedRequest>;

export interface iAdvertQuery {
  [key: string]: string;
}

export interface iFilterList {
  [key: string]: { [key: string]: string | number };
}
