// UserInteractor.ts
import { inject, injectable } from "tsyringe";
import { IUserInteractor } from "./IUserInteractor";
import { UserGitHubService } from "../service/UserGitHubService";
import { IUserRepository } from "../repository/IUserRepository";
import { IUserProps, UserEntity } from "../entity/UserEntity";
import CustomError from "../../../errors/customError";
import HttpStatusCode from "../../../errors/httpStatusCodes";

@injectable()
export class UserInteractor implements IUserInteractor {
    constructor(
        @inject(UserGitHubService) private githubService: UserGitHubService,
        @inject("IUserRepository") private userRepository: IUserRepository
    ) { }

    async saveUser(username: string): Promise<UserEntity> {
        try {
            console.log(`Interactor - Finding user: ${username}`);
            // Check if user exists in DB
            const existingUser = await this.userRepository.findByLogin(username);
            
            if (existingUser) {
                console.log(`Interactor - User ${username} found in database, returning existing user`);
                return existingUser;
            }
            
            console.log(`Interactor - User ${username} not found in database, fetching from GitHub`);
            // User not found in DB, fetch from GitHub API
            const rawData = await this.githubService.fetchUser(username);
            const user = new UserEntity(rawData);
            
            // Save to database
            console.log(`Interactor - Saving user ${username} to database`);
            return this.userRepository.save(user);
        } catch (error) {
            console.error(`Interactor - saveUser error:`, error);
            throw error instanceof CustomError
                ? error
                : new CustomError(
                    error instanceof Error ? error.message : "Unknown error",
                    HttpStatusCode.INTERNAL_SERVER
                );
        }
    }

    // Other methods remain unchanged
    async getAllUsers(): Promise<UserEntity[]> {
        try {
            return this.userRepository.findAll();
        } catch (error) {
            throw error instanceof CustomError
                ? error
                : new CustomError(
                    error instanceof Error ? error.message : "Unknown error",
                    HttpStatusCode.INTERNAL_SERVER
                );
        }
    }

    async deleteUser(username: string): Promise<void> {
        try {
            const user = await this.userRepository.findByLogin(username);
            if (!user) {
                throw new CustomError("User not found", HttpStatusCode.NOT_FOUND);
            }
            
            await this.userRepository.softDelete(username);
        } catch (error) {
            throw error instanceof CustomError
                ? error
                : new CustomError(
                    error instanceof Error ? error.message : "Unknown error",
                    HttpStatusCode.INTERNAL_SERVER
                );
        }
    }

    async updateUser(username: string, updateData: Record<string, any>): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findByLogin(username);
            if (!user) {
                throw new CustomError("User not found", HttpStatusCode.NOT_FOUND);
            }
            
            const allowedUpdates = ['name', 'company', 'location', 'bio', 'blog'];
            const sanitizedUpdates: Partial<IUserProps> = {};
            
            for (const key of allowedUpdates) {
                if (key in updateData) {
                    sanitizedUpdates[key as keyof IUserProps] = updateData[key];
                }
            }
            
            // Update the timestamp
            sanitizedUpdates.updated_at = new Date().toISOString();
            
            return this.userRepository.update(username, sanitizedUpdates);
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