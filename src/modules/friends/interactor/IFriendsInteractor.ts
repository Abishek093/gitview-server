import { FriendEntity } from "../entity/FriendsEntity";

export interface IFriendsInteractor {
    findAndSaveFriends(username: string): Promise<FriendEntity[]>;
    getFriendsForUser(username: string): Promise<FriendEntity[]>;
  }