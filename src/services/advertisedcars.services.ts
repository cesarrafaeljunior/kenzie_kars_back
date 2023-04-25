import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import {
  iAdvertised,
  iAdvertisedRequest,
  iAdvertisedUpdate,
} from "../interfaces/advertised.interfaces";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";
import { Advertised_car } from "../entities/adverts.entity";
import {
  advertiseListByUserResponseSchema,
  advertisedListResponseSchema,
  advertisedResponseSchema,
} from "../schemas/advertisedcars.shemas";
import { Brand } from "../entities/brands.entity";
import { findOneByNameOrCreate } from "../utils/findOneByNameOrCreate";
import { Model } from "../entities/models.entity";
import { Fuel } from "../entities/fuels.entity";
import { Color } from "../entities/colors.entity";
import { Year } from "../entities/years.entity";

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

  const {
    title,
    mileage,
    price,
    fipe_price,
    description,
    cover_image,
    location,
  } = advertisedData;

  const advertised: Advertised_car = advertisedRespository.create({
    title,
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

  const advertisedValidated = advertisedResponseSchema.validateSync(
    { ...advertised, galery: [] },
    { stripUnknown: true, abortEarly: false }
  );

  return advertisedValidated;
};

export const retrieveAdvertisedByUserService = async (userId: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const advertised = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      adverts: {
        brand: true,
        model: true,
        fuel: true,
        color: true,
        year: true,
        galery: true,
      },
    },
  });

  if (!advertised) {
    throw new AppError("user not found ", 404);
  }

  const advertisedValidated = advertiseListByUserResponseSchema.validateSync(
    advertised,
    { stripUnknown: true, abortEarly: false }
  );

  return advertisedValidated;
};

export const retrieveAdvertisedService = async (advertise: Advertised_car) => {
  const advertisedValidated = advertisedResponseSchema.validateSync(advertise, {
    stripUnknown: true,
    abortEarly: false,
  });

  return advertisedValidated;
};

export const retrieveAllAdvertisedService = async () => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

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
  });

  const advertiseValidated = advertisedListResponseSchema.validateSync(
    advertisedList,
    { abortEarly: false, stripUnknown: true }
  );

  return advertiseValidated;
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
