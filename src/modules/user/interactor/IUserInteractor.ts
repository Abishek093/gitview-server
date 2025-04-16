import { UserEntity } from "../entity/UserEntity";

export interface IUserInteractor{
    saveUser(username: string): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    deleteUser(username: string): Promise<void>;
}