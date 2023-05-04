import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export class AppError extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.errors });
  }

  console.log(err);

  return res.status(500).json({ message: "Internal Server Error!" });
};
