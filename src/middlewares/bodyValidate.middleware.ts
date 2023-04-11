import { NextFunction, Request, Response } from "express";
import { AnyObject } from "yup";

export const bodyValidateMiddleware =
    (schema: AnyObject) => async (req: Request, res: Response, next: NextFunction) => {
        const validate = schema.validateSync(req.body, {
            stripUnknown: true,
            abortEarly: false,
        });

        req.body = validate;

        return next();
    };
