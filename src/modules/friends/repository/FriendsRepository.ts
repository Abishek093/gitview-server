import { injectable } from "tsyringe";
import { IFriendsRepository } from "./IFriendsRepository";
import FriendModel from "./FriendModel";
import { FriendEntity } from "../entity/FriendsEntity"; 

@injectable()
export class FriendsRepository implements IFriendsRepository {
  async saveMany(friends: FriendEntity[]): Promise<void> {
    const docs = friends.map(f => new FriendModel(f.toObject()));
    await FriendModel.insertMany(docs, { ordered: false }).catch(() => {});
  }

  async getFriendsForUser(username: string): Promise<FriendEntity[]> {
    const docs = await FriendModel.find({ user: username }).lean();
    return docs.map(doc => new FriendEntity(doc));
  }
}
