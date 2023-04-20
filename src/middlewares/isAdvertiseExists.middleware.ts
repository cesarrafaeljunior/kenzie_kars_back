import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Advertised_car } from "../entities/adverts.entity";
import { AppError } from "../errors";

export const isAdvertiseExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const advertise = await AppDataSource.getRepository(Advertised_car)
    .findOneOrFail({
      where: { id: req.params.advertId },
      relations: {
        user: true,
        brand: true,
        model: true,
        fuel: true,
        color: true,
        year: true,
        galery: true,
      },
    })
    .catch(() => {
      throw new AppError("Advertise not found ", 404);
    });

  req.paramAdvertise = advertise;
  return next();
};
