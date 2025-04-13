import { inject, injectable } from "tsyringe";
import { IFriendsInteractor } from "./IFriendsInteractor";
import { IFriendsRepository } from "../repository/IFriendsRepository";
import { UserGitHubService } from "../../user/service/UserGitHubService";
import { FriendEntity } from "../entity/FriendsEntity";

@injectable()
export class FriendsInteractor implements IFriendsInteractor {
  constructor(
    @inject("IFriendsRepository") private friendsRepository: IFriendsRepository,
    @inject(UserGitHubService) private githubService: UserGitHubService
  ) {}

  async findAndSaveFriends(username: string): Promise<FriendEntity[]> {
    const followers = await this.githubService.fetchFollowers(username); 
    const following = await this.githubService.fetchFollowing(username); 

    const mutuals = followers.filter(f => following.includes(f));
    
    const friendEntities = mutuals.map(friend => new FriendEntity({
      user: username,
      friend,
      mutual: true
    }));

    await this.friendsRepository.saveMany(friendEntities);

    return friendEntities;
  }

  async getFriendsForUser(username: string): Promise<FriendEntity[]> {
    return this.friendsRepository.getFriendsForUser(username);
  }
}