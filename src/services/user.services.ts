import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";
import { iUserRequest, iUserUpdate } from "../interfaces/user.interfaces";

export const createUserService = async (body: iUserRequest): Promise<User> => {
    const userRepo = AppDataSource.getRepository(User);

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

    const newUser = userRepo.create(body);
    await userRepo.save(newUser);

    // Fazer schema para remover a senha com o yup

    return newUser;
};

export const retrieveUserService = async (user_id: string): Promise<User> => {
    const user = await AppDataSource.getRepository(User)
        .findOneByOrFail({ id: user_id })
        .catch(() => {
            throw new AppError("User not found", 404);
        });

    // Fazer schema para remover a senha com o yup

    return user;
};

export const editUserService = async (body: iUserUpdate, user_id: string): Promise<User> => {
    const userRepo = AppDataSource.getRepository(User);

    let user = await userRepo.findOneByOrFail({ id: user_id }).catch(() => {
        throw new AppError("User not found", 404);
    });

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
        await userRepo.findOneBy({ phone_number: body.phone_number }).then((res) => {
            if (res?.id) {
                throw new AppError("This phone number already used", 409);
            }
        });
    }

    user = userRepo.create({ ...user, ...body });
    await userRepo.save(user);

    // Fazer schema para remover a senha com o yup

    return user;
};
