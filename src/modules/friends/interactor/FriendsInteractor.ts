// import { inject, injectable } from "tsyringe";
// import { IFriendsInteractor } from "./IFriendsInteractor";
// import { IFriendsRepository } from "../repository/IFriendsRepository";
// import { UserGitHubService } from "../../user/service/UserGitHubService";
// import { FriendEntity } from "../entity/FriendsEntity";

// @injectable()
// export class FriendsInteractor implements IFriendsInteractor {
//   constructor(
//     @inject("IFriendsRepository") private friendsRepository: IFriendsRepository,
//     @inject(UserGitHubService) private githubService: UserGitHubService
//   ) {}

//   async findAndSaveFriends(username: string): Promise<FriendEntity[]> {
//     const followers = await this.githubService.fetchFollowers(username); 
//     const following = await this.githubService.fetchFollowing(username); 

//     const mutuals = followers.filter(f => following.includes(f));
    
//     const friendEntities = mutuals.map(friend => new FriendEntity({
//       user: username,
//       friend,
//       mutual: true
//     }));

//     await this.friendsRepository.saveMany(friendEntities);

//     return friendEntities;
//   }

//   async getFriendsForUser(username: string): Promise<FriendEntity[]> {
//     return this.friendsRepository.getFriendsForUser(username);
//   }
// }


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
    // Fetch both followers and their details
    const followers = await this.githubService.fetchFollowers(username); 
    const following = await this.githubService.fetchFollowing(username);
    
    // Get detailed info for followers to extract avatars
    const followersDetails = await this.githubService.fetchFollowersDetails(username);
    
    // Create a map of username to avatar URL
    const avatarMap = new Map();
    followersDetails.forEach(follower => {
      avatarMap.set(follower.login, follower.avatar_url);
    });

    // Find mutual follows (users that the main user follows and who follow the user back)
    const mutuals = followers.filter(f => following.includes(f));
    
    // Create friend entities with avatar URLs when available
    const friendEntities = mutuals.map(friend => new FriendEntity({
      user: username,
      friend,
      mutual: true,
      avatar_url: avatarMap.get(friend) || `https://avatars.githubusercontent.com/${friend}`
    }));

    // Save to database
    await this.friendsRepository.saveMany(friendEntities);

    return friendEntities;
  }

  async getFriendsForUser(username: string): Promise<FriendEntity[]> {
    return this.friendsRepository.getFriendsForUser(username);
  }
}