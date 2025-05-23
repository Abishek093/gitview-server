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
    
    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userInteractor.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };
    
    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;
        
        try {
            await this.userInteractor.deleteUser(username);
            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;
        const updateData = req.body;
        
        try {
            const updatedUser = await this.userInteractor.updateUser(username, updateData);
            res.status(200).json(updatedUser.toObject());
        } catch (error) {
            next(error);
        }
    };

    searchUsers = async (req: Request, res: Response, next: NextFunction) => {
        const { login, username, location, company } = req.query;
    
        try {
            const filters: Record<string, any> = {};
            if (username) filters.login = username;
            if (location) filters.location = location;
            if (company) filters.company = company;
            if (login) filters.login = login
    
            const users = await this.userInteractor.searchUsers(filters);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    getAllSortedUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sortField = req.query.sort as string || 'login';
            const sortOrder = req.query.order as string === 'desc' ? -1 : 1;
            
            const users = await this.userInteractor.getAllSortedUsers(sortField, sortOrder);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };
}