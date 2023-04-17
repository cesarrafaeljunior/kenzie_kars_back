import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { Address } from "../entities/adresses.entity";
import {
  iAddressRequest,
  iAddressUpdate,
} from "../interfaces/address.interface";
import { AppError } from "../errors";

export const createAddressService = async (
  addressBody: iAddressRequest,
  user: User
) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const userAddress = await userRepo.findOne({
    where: {
      id: user.id,
    },
    relations: {
      adresses: true,
    },
  });

  if (userAddress?.adresses[0]) {
    throw new AppError("User already has an address ", 401);
  }

  const newAddres = addressRepo.create({
    ...addressBody,
    user: user,
  });

  await addressRepo.save(newAddres);

  return newAddres;
};

export const retrieveAddressUserService = async (user: User) => {
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const address = await addressRepo.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
  });

  if (!address) {
    throw new AppError("Dont have address for this user", 404);
  }

  return address;
};

export const editAddressService = async (
  user: User,
  newAddress: iAddressUpdate
) => {
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const address = await addressRepo.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
  });

  if (!address) {
    throw new AppError("Dont have address for this user", 404);
  }

  const addressUpdated = {
    ...address,
    ...newAddress,
    userId: user.id,
  };

  const newAddres = addressRepo.save(addressUpdated);

  return newAddres;
};

export const deleteAddressService = async (user: User) => {
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const address = await addressRepo.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
    relations: {
      user: true,
    },
  });

  if (!address) {
    throw new AppError("Dont have address for this user", 404);
  }

  await addressRepo.delete({ id: address.id });

  return {};
};
