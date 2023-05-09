import { Advertised_car } from "../entities/adverts.entity";
import { advertisedListResponseSchema } from "../schemas/advertisedcars.schemas";

export const formatToNumber = (value: string, defaultValue: number) => {
  const number = Number(value.replace(/[^0-9-]/g, ""));
  return number <= 0 ? defaultValue : number;
};

export const getPaginationFormat = (
  data: Advertised_car[],
  page: number,
  perPage: number,
  unpaginatedData: Advertised_car[],
  hostname: string,
  baseUrl: string
) => {
  baseUrl =
    hostname == "localhost"
      ? `http://${hostname}:${process.env.PORT}${baseUrl}`
      : `https://${hostname}${baseUrl}`;
  const count = unpaginatedData.length;

  if (page * perPage - perPage > count) {
    page = Math.ceil(count / perPage) + 1;
  }

  return {
    count,
    next: page * perPage >= count ? null : `${baseUrl}?page=${page + 1}`,
    previous: page - 1 == 0 ? null : `${baseUrl}?page=${page - 1}`,
    results: advertisedListResponseSchema.validateSync(data, {
      abortEarly: false,
      stripUnknown: true,
    }),
    unpaginatedResults: advertisedListResponseSchema.validateSync(
      unpaginatedData,
      { abortEarly: false, stripUnknown: true }
    ),
  };
};
