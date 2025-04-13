import { FriendEntity } from "../entity/FriendsEntity";

export interface IFriendsRepository{
    saveMany(friends: FriendEntity[]): Promise<void>
    getFriendsForUser(username: string): Promise<FriendEntity[]>
}