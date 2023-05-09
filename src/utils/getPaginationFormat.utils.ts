import { iGetPaginationFormat } from "../interfaces/util.interfaces";

export const formatToNumber = (value: string, defaultValue: number) => {
  const number = Number(value.replace(/[^0-9-]/g, ""));
  return number <= 0 ? defaultValue : number;
};

export const getPaginationFormat = ({
  data,
  count,
  page,
  perPage,
  hostname,
  baseUrl,
}: iGetPaginationFormat) => {
  baseUrl =
    hostname == "localhost"
      ? `http://${hostname}:${process.env.PORT}${baseUrl}`
      : `https://${hostname}${baseUrl}`;

  let previous = page - 1 == 0 ? null : `${baseUrl}?page=${page - 1}`;
  const last = `${baseUrl}?page=${Math.ceil(count / perPage)}`;

  if (page * perPage - perPage > count) {
    page = Math.ceil(count / perPage);
    previous = last;
  }

  return {
    count,
    first: page == 1 ? null : `${baseUrl}?page=1`,
    previous,
    next: page * perPage >= count ? null : `${baseUrl}?page=${page + 1}`,
    last: Math.ceil(count / perPage) == page ? null : last,
    results: data,
  };
};
