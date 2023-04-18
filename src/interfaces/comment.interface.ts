import { iAdvertised } from "./advertised.interfaces";
import { iUser } from "./user.interfaces";

export interface iComment {
  description: string;
  created_at: Date;
  updated_at: Date;
  user: iUser;
  advert: iAdvertised;
}
