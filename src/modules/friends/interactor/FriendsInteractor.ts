import { inject, injectable } from "tsyringe";
import { IUserInteractor } from "./IFriendsInteractor";
import { GitHubService } from "../service/GitHubService";
import { IUserRepository } from "../repository/IFriendsRepository";
import { UserEntity } from "../entity/FriendsEntity";
import CustomError from "../../../errors/customError";
import HttpStatusCode from "../../../errors/httpStatusCodes";

@injectable()
export class UserInteractor implements IUserInteractor {
    constructor(
        @inject(GitHubService) private githubService: GitHubService,
        @inject("IUserRepository") private userRepository: IUserRepository
    ) { }

    async saveUser(username: string): Promise<UserEntity> {
        try {
            const existing = await this.userRepository.findByLogin(username);
            if (existing) return existing;
        
            const rawData = await this.githubService.fetchUser(username);
            const user = new UserEntity(rawData);
            return this.userRepository.save(user);            
        } catch (error) {
            throw error instanceof CustomError
                ? error
                : new CustomError(
                    error instanceof Error ? error.message : "Unknown error",
                    HttpStatusCode.INTERNAL_SERVER
                );
        }
      }
}