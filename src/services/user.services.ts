import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities/adresses.entity";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";
import {
  iUser,
  iUserNotAddress,
  iUserRequest,
  iUserUpdate,
} from "../interfaces/user.interfaces";
import {
  userResponseSchema,
  userResponseSchemaNotAddress,
} from "../schemas/user.schemas";
import { resetPasswordTemplate, sendEmail } from "../utils/sendEmail.utils";
import { hashSync } from "bcryptjs";

export const createUserService = async (body: iUserRequest): Promise<any> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  await userRepo.findOneBy({ email: body.email }).then((res) => {
    if (res?.id) {
      throw new AppError("This email already used", 409);
    }
  });

  await userRepo.findOneBy({ cpf: body.cpf }).then((res) => {
    if (res?.id) {
      throw new AppError("This cpf already used", 409);
    }
  });

  await userRepo.findOneBy({ phone_number: body.phone_number }).then((res) => {
    if (res?.id) {
      throw new AppError("This phone number already used", 409);
    }
  });

  const newUser = userRepo.create({
    name: body.name,
    email: body.email,
    cpf: body.cpf,
    phone_number: body.phone_number,
    birthdate: body.birthdate,
    description: body.description,
    password: body.password,
    is_seller: body.is_seller,
  });

  const user = await userRepo.save(newUser);

  const newAddres = addressRepo.create({
    ...body.address,
    user: user,
  });

  const address = await addressRepo.save(newAddres);

  const response = {
    ...user,
    address: address,
  };

  const userValidated: iUser = userResponseSchema.validateSync(response, {
    stripUnknown: true,
    abortEarly: false,
  });

  return userValidated;
};

export const retrieveUserService = async (
  user: User
): Promise<iUser | iUserNotAddress> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const address = await userRepo.findOne({
    where: {
      id: user.id,
    },
    relations: {
      address: true,
    },
  });

  if (address?.address) {
    const addressComparation = {
      ...address,
      address: address?.address,
    };

    const userValidated: iUser = userResponseSchema.validateSync(
      addressComparation,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );
    return userValidated;
  }

  const userValidated: iUserNotAddress =
    userResponseSchemaNotAddress.validateSync(user, {
      stripUnknown: true,
      abortEarly: false,
    });
  return userValidated;
};

export const editUserService = async (
  body: iUserUpdate,
  user: User
): Promise<iUserNotAddress> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  if (body.email) {
    await userRepo.findOneBy({ email: body.email }).then((res) => {
      if (res?.id) {
        throw new AppError("This email already used", 409);
      }
    });
  }

  if (body.cpf) {
    await userRepo.findOneBy({ cpf: body.cpf }).then((res) => {
      if (res?.id) {
        throw new AppError("This cpf already used", 409);
      }
    });
  }

  if (body.phone_number) {
    await userRepo
      .findOneBy({ phone_number: body.phone_number })
      .then((res) => {
        if (res?.id) {
          throw new AppError("This phone number already used", 409);
        }
      });
  }

  user = userRepo.create({ ...user, ...body });
  await userRepo.save(user);

  const userValidated: iUserNotAddress =
    userResponseSchemaNotAddress.validateSync(user, {
      stripUnknown: true,
      abortEarly: false,
    });

  return userValidated;
};

export const deleteUserService = async (user: User): Promise<Object> => {
  await AppDataSource.getRepository(User).softDelete({ id: user.id });

  return {};
};

export const sendResetEmailPasswordService = async (
  email: string,
  protocol: string,
  host: string
) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ email: email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken = randomUUID();

  user.reset_token = resetToken;

  await userRepo.save(user);

  const templateEmail = resetPasswordTemplate(
    email,
    user.name,
    protocol,
    host,
    resetToken
  );

  await sendEmail(templateEmail);

  return user.reset_token;
};

export const resetPasswordService = async (
  password: string,
  resetToken: string
) => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({ reset_token: resetToken });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.password = password;
  user.reset_token = null!;

  await userRepo.save(user);
};
