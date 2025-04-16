import { UserEntity } from "../entity/UserEntity";

export interface IUserRepository{
    findByLogin(username: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    save(user: UserEntity): Promise<UserEntity>;
    softDelete(username: string): Promise<void>;
}