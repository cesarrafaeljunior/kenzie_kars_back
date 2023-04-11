import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { User } from "../entities/users.entity";

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new AppError("Missing authorization token", 401);
    }
    token = token.split(" ")[1];

    return verify(token, process.env.SECRET_KEY || "", async (err, decoded) => {
        if (err) {
            throw new AppError(err.message, 401);
        }

        const authUser = await AppDataSource.getRepository(User)
            .findOneByOrFail({ id: decoded!.sub as string })
            .catch(() => {
                throw new AppError("Invalid token because token owner is unavailable", 401);
            });
        req.authUser = authUser;
        return next();
    });
};
