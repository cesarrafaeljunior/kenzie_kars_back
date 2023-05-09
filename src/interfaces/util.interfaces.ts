import { Advertised_car } from "../entities/adverts.entity";

export interface iGetPaginationFormat {
  data: Advertised_car[];
  count: number;
  page: number;
  perPage: number;
  hostname: string;
  baseUrl: string;
}
