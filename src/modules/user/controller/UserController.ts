import { inject, injectable } from "tsyringe";
import { IUserInteractor } from "../interactor/IUserInteractor";
import { NextFunction, Request, Response } from "express";


@injectable()
export class UserController {

    constructor(@inject("IUserInteractor") private userInteractor: IUserInteractor) { }

    saveUser = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;

        try {
            const user = await this.userInteractor.saveUser(username);
            res.status(200).json(user.toObject());
        } catch (error) {
            next(error)
        }
    };
    
}