import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import {
  iAdvertQuery,
  iAdvertised,
  iAdvertisedRequest,
  iAdvertisedUpdate,
  iFilterList,
} from "../interfaces/advertised.interfaces";
import { Between, Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { Advertised_car } from "../entities/adverts.entity";
import {
  advertiseListByUserResponseSchemaPaginated,
  advertisedListResponseSchema,
  advertisedListResponseSchemaPaginated,
  advertisedResponseSchema,
  advertisedResponseWithComments,
} from "../schemas/advertisedcars.schemas";
import { Brand } from "../entities/brands.entity";
import { findOneByNameOrCreate } from "../utils/findOneByNameOrCreate";
import { Model } from "../entities/models.entity";
import { Fuel } from "../entities/fuels.entity";
import { Color } from "../entities/colors.entity";
import { Year } from "../entities/years.entity";
import { SellerGalery } from "../entities/sellerGalery.entity";
import {
  formatToNumber,
  getPaginationFormat,
} from "../utils/getPaginationFormat.utils";

export const createAdvertisedService = async (
  user: User,
  advertisedData: iAdvertisedRequest
): Promise<iAdvertised> => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

  const { brand, model, fuel, color, year } = advertisedData;

  const brandObj = await findOneByNameOrCreate(Brand, { brand });
  const modelObj = await findOneByNameOrCreate(Model, { model });
  const fuelObj = await findOneByNameOrCreate(Fuel, { fuel });
  const colorObj = await findOneByNameOrCreate(Color, { color });
  const yearObj = await findOneByNameOrCreate(Year, { year });

  const { mileage, price, fipe_price, description, cover_image, location } =
    advertisedData;

  const advertised: Advertised_car = advertisedRespository.create({
    mileage,
    price,
    fipe_price,
    description,
    cover_image,
    location,
    user: user,
    brand: brandObj,
    model: modelObj,
    fuel: fuelObj,
    color: colorObj,
    year: yearObj,
  });
  await advertisedRespository.save(advertised);

  const galeryRepo = AppDataSource.getRepository(SellerGalery);
  const newImages = advertisedData.galery.map(({ image }) =>
    galeryRepo.create({ image, advert: advertised })
  );
  await galeryRepo.save(newImages);

  const advertisedValidated = advertisedResponseSchema.validateSync(
    { ...advertised, galery: newImages },
    { stripUnknown: true, abortEarly: false }
  );

  return advertisedValidated;
};

export const retrieveAdvertisedByUserService = async (
  user: User,
  query: iAdvertQuery,
  hostname: string,
  baseUrl: string
) => {
  const advertisedRespository = AppDataSource.getRepository(Advertised_car);
  user = await AppDataSource.getRepository(User)
    .findOneOrFail({
      where: { id: user.id },
      relations: { adverts: { galery: true } },
    })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  const page = query.page ? formatToNumber(query.page, 1) : 1;
  const perPage = query.perPage ? formatToNumber(query.perPage, 10) : 10;

  const advertisedListToPaginate = await advertisedRespository
    .find({
      relations: {
        brand: true,
        model: true,
        fuel: true,
        color: true,
        year: true,
        galery: true,
      },
      where: { user: { id: user.id } },
      order: { created_at: "DESC" },
      skip: page * perPage - perPage,
      take: perPage,
    })
    .then((data) =>
      getPaginationFormat({
        data,
        count: user.adverts.length,
        page,
        perPage,
        hostname,
        baseUrl,
      })
    );

  const userValidated = advertiseListByUserResponseSchemaPaginated.validateSync(
    { ...user, ...advertisedListToPaginate },
    { stripUnknown: true, abortEarly: false }
  );

  return userValidated;
};

export const retrieveAdvertisedService = async (advertise: Advertised_car) => {
  advertise = await AppDataSource.getRepository(Advertised_car)
    .findOneOrFail({
      where: { id: advertise.id },
      relations: {
        user: true,
        brand: true,
        model: true,
        fuel: true,
        color: true,
        year: true,
        galery: true,
        comments: {
          user: true,
        },
      },
    })
    .catch(() => {
      throw new AppError("Advertise not found", 404);
    });

  const advertisedValidated = advertisedResponseWithComments.validateSync(
    advertise,
    { stripUnknown: true, abortEarly: false }
  );

  return advertisedValidated;
};

export const retrieveAllAdvertisedService = async (
  query: iAdvertQuery,
  hostname: string,
  baseUrl: string
) => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

  let filterList: iFilterList = {
    brand: { brand: query.brand },
    model: { model: query.model },
    color: { color: query.color },
    fuel: { fuel: query.fuel },
    price: Between(
      parseFloat(query.min_price || "0"),
      parseFloat(query.max_price || "999999999")
    ),
    mileage: Between(
      Number(query.min_mileage || "0"),
      Number(query.max_mileage || "999999999")
    ),
  };
  if (query.year) {
    filterList = { ...filterList, year: { year: Number(query.year) } };
  }
  const page = query.page ? formatToNumber(query.page, 1) : 1;
  const perPage = query.perPage ? formatToNumber(query.perPage, 10) : 10;

  const advertisedList = await advertisedRespository.find({
    relations: {
      user: true,
      brand: true,
      model: true,
      fuel: true,
      color: true,
      year: true,
      galery: true,
    },
    where: filterList,
    order: { created_at: "DESC" },
  });

  const advertisedListPaginated = await advertisedRespository
    .find({
      relations: {
        user: true,
        brand: true,
        model: true,
        fuel: true,
        color: true,
        year: true,
        galery: true,
      },
      where: filterList,
      order: { created_at: "DESC" },
      skip: page * perPage - perPage,
      take: perPage,
    })
    .then((data) =>
      getPaginationFormat({
        data,
        count: advertisedList.length,
        page,
        perPage,
        hostname,
        baseUrl,
      })
    );

  const advertisedListValidated =
    advertisedListResponseSchemaPaginated.validateSync(
      { ...advertisedListPaginated, unpaginatedResults: advertisedList },
      { stripUnknown: true, abortEarly: false }
    );

  return advertisedListValidated;
};

export const editAdvertisedService = async (
  oldAdvertiseObj: Advertised_car,
  advertisedData: iAdvertisedUpdate
) => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

  const { brand, model, fuel, color, year } = advertisedData;
  let advertiseComplete = {};

  brand &&
    (await findOneByNameOrCreate(Brand, { brand }).then(
      (res) => (advertiseComplete = { ...advertiseComplete, brand: res })
    ));
  model &&
    (await findOneByNameOrCreate(Model, { model }).then(
      (res) => (advertiseComplete = { ...advertiseComplete, model: res })
    ));
  fuel &&
    (await findOneByNameOrCreate(Fuel, { fuel }).then(
      (res) => (advertiseComplete = { ...advertiseComplete, fuel: res })
    ));
  color &&
    (await findOneByNameOrCreate(Color, { color }).then(
      (res) => (advertiseComplete = { ...advertiseComplete, color: res })
    ));
  year &&
    (await findOneByNameOrCreate(Year, { year }).then(
      (res) => (advertiseComplete = { ...advertiseComplete, year: res })
    ));

  if (advertisedData.galery) {
    const galeryRepo = AppDataSource.getRepository(SellerGalery);

    const galery = advertisedData.galery.map(({ image }, index) =>
      galeryRepo.create(
        oldAdvertiseObj.galery[index]
          ? { ...oldAdvertiseObj.galery[index], image }
          : { image, advert: oldAdvertiseObj }
      )
    );
    await galeryRepo.save(galery);
    advertisedData.galery = galery;

    const residualImages = oldAdvertiseObj.galery.splice(galery.length);
    await galeryRepo.remove(residualImages);
  }

  advertiseComplete = { ...advertisedData, ...advertiseComplete };

  const advertised: Advertised_car = advertisedRespository.create({
    ...oldAdvertiseObj,
    ...advertiseComplete,
  });

  await advertisedRespository.save(advertised);

  const advertisedValidated = advertisedResponseSchema.validateSync(
    advertised,
    { stripUnknown: true, abortEarly: false }
  );

  return advertisedValidated;
};

export const deleteAdvertisedService = async (
  advertiseObj: Advertised_car
): Promise<void> => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

  await advertisedRespository.remove(advertiseObj);

  return;
};
