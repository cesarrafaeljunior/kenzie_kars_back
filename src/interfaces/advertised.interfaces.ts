import { InferType } from "yup";
import { advertisedResponseSchema } from "../schemas/advertisedcars.shemas";

export type iAdvertised = InferType<typeof advertisedResponseSchema>;

export interface iAdvertisedRequest {
  title: string;
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
}

export type iAdvertisedUpdate = Partial<iAdvertisedRequest>;
