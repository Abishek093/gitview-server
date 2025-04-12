import { UserEntity } from "../entity/UserEntity";

export interface IUserRepository{
    findByLogin(username: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
}