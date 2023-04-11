import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";
import { iLogin } from "../interfaces/login.interfaces";

export const loginService = async (body: iLogin): Promise<string> => {
    const user = await AppDataSource.getRepository(User)
        .findOneByOrFail({ email: body.email })
        .then((res) => {
            const isValidPassword = compareSync(body.password, res.password);
            if (!isValidPassword) {
                throw new AppError("Email or password incorrect", 400);
            }
            return res;
        })
        .catch(() => {
            throw new AppError("Email or password incorrect", 400);
        });

    const token = sign({}, process.env.SECRET_KEY || "", {
        expiresIn: "8h",
        subject: user.id,
    });

    return token;
};
