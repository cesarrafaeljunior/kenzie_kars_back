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
  advertisedResponseSchema,
  advertisedUpdateSchema,
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

  const { title, mileage, price, description, cover_image, location } =
    advertisedData;

  const advertised: Advertised_car = advertisedRespository.create({
    title,
    mileage,
    price,
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
    advertised,
    {
      stripUnknown: true,
      abortEarly: false,
    }
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
      adverts: true,
    },
  });

  if (!advertised) {
    throw new AppError("user not found ", 404);
  }

  return advertised;
};

export const retrieveAllAdvertisedService = async () => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

  const advertisedList = advertisedRespository.find({
    relations: {
      user: true,
    },
  });
  return advertisedList;
};

export const editAdvertisedService = async (
  advertisedId: string,
  advertisedData: iAdvertisedUpdate
) => {
  throw new AppError("Under maintenance!", 500);

  // const advertisedRespository: Repository<Advertised_car> =
  //   AppDataSource.getRepository(Advertised_car);

  // const oldAdvertisedData = await advertisedRespository.findOneBy({
  //   id: advertisedId,
  // });

  // if (!oldAdvertisedData) {
  //   throw new AppError("advertise not found ", 404);
  // }
  // const advertised = advertisedRespository.create({
  //   ...oldAdvertisedData,
  //   ...advertisedData,
  // });

  // await advertisedRespository.save(advertised);

  // const advertisedValidated: iAdvertisedUpdate =
  //   advertisedUpdateSchema.validateSync(advertised, {
  //     stripUnknown: true,
  //     abortEarly: false,
  //   });

  // return advertisedValidated;
};

export const deleteAdvertisedService = async (
  idAdvertised: string
): Promise<void> => {
  const advertisedRespository: Repository<Advertised_car> =
    AppDataSource.getRepository(Advertised_car);

  const advertised = await advertisedRespository.findOne({
    where: {
      id: idAdvertised,
    },
  });

  if (!advertised) {
    throw new AppError("advertise not found ", 404);
  }
  await advertisedRespository.remove(advertised!);

  return;
};
