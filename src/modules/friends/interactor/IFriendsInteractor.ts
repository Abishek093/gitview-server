import { UserEntity } from "../entity/FriendsEntity";

export interface IUserInteractor{
    saveUser(username: string): Promise<UserEntity>;
}