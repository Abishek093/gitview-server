import axios from "axios";
import { injectable } from "tsyringe";
import { IRepoRepository } from "./IRepoRepository";
import { IRepoEntity } from "../entity/RepoEnitity";
import CustomError from "../../../errors/customError";
import HttpStatusCode from "../../../errors/httpStatusCodes";


@injectable()
export class RepoRepository implements IRepoRepository {
    async getUserRepos(username: string, page: number = 1, perPage: number = 6): Promise<IRepoEntity[]> {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
                params: {
                    page: page,
                    per_page: perPage
                },
                headers: {
                    'Authorization': `token ${process.env.GITVIEW_TOKEN}`
                }
            });
            return response.data.map((repo: any) => this.mapToEntity(repo));
        } catch (error) {
            throw new CustomError(
                error,
                HttpStatusCode.NOT_FOUND,
                `Failed to fetch repos for user: ${username}`
            );
        }
    }

      
    async getRepoDetails(username: string, repoName: string): Promise<IRepoEntity> {
        try {
            const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`, {
                headers: {
                    'Authorization': `token ${process.env.GITVIEW_TOKEN}`
                }
            });
            return this.mapToEntity(response.data);
        } catch (error) {
            throw new CustomError(
                error,
                HttpStatusCode.NOT_FOUND,
                `Repository '${repoName}' not found for user: ${username}`
            );
        }
    }

    private mapToEntity(data: any): IRepoEntity {
        return {
            id: data.id,
            name: data.name,
            full_name: data.full_name,
            html_url: data.html_url,
            description: data.description,
            language: data.language,
            forks_count: data.forks_count,
            stargazers_count: data.stargazers_count,
            watchers_count: data.watchers_count,
            created_at: data.created_at,
            updated_at: data.updated_at,
        };
    }
}
