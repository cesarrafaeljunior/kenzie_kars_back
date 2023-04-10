import { Request, Response } from "express";
import { createUserService, editUserService, retrieveUserService } from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
};

export const retrieveUserController = async (req: Request, res: Response) => {
    const user = await retrieveUserService(req.params.id);
    return res.status(200).json(user);
};

export const editUserController = async (req: Request, res: Response) => {
    const user = await editUserService(req.body, req.params.id);
    return res.status(200).json(user);
};
