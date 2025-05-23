import { IRepoEntity } from "../entity/RepoEnitity"; 

export interface IRepoRepository {
    getUserRepos(username: string, page?: number, perPage?: number): Promise<IRepoEntity[]>
  getRepoDetails(username: string, repoName: string): Promise<IRepoEntity>;
}
