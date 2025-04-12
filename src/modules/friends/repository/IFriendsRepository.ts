import { UserEntity } from "../entity/FriendsEntity";

export interface IUserRepository{
    findByLogin(username: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
}