import { inject, injectable } from "tsyringe";
import { IRepoInteractor } from "./IRepoInteractor";
import { IRepoRepository } from "../repository/IRepoRepository";
import { IRepoEntity } from "../entity/RepoEnitity";
import CustomError from "../../../errors/customError";
import HttpStatusCode from "../../../errors/httpStatusCodes";


@injectable()
export class RepoInteractor implements IRepoInteractor {
  constructor(
    @inject("IRepoRepository") private repoRepository: IRepoRepository
  ) {}

  async getUserRepos(username: string, page?: number, perPage?: number): Promise<IRepoEntity[]> {
    try {
      return await this.repoRepository.getUserRepos(username, page, perPage);
    } catch (error) {
      throw new CustomError(
        error,
        HttpStatusCode.INTERNAL_SERVER,
        `Could not fetch repositories for user "${username}".`
      );
    }
  }

  async getRepoDetails(username: string, repoName: string): Promise<IRepoEntity> {
    try {
      return await this.repoRepository.getRepoDetails(username, repoName);
    } catch (error) {
      throw new CustomError(
        error,
        HttpStatusCode.INTERNAL_SERVER,
        `Could not fetch details for repo "${repoName}" of user "${username}".`
      );
    }
  }
}
