import { injectable } from "tsyringe";
import { IUserRepository } from "./IUserRepository";
import { IUserProps, UserEntity } from "../entity/UserEntity";
import UserModel from "./UserModel";
import CustomError from "../../../errors/customError";
import HttpStatusCode from "../../../errors/httpStatusCodes";

@injectable()
export class UserRepository implements IUserRepository {

    async findByLogin(username: string): Promise<UserEntity | null> {
        try {
            const doc = await UserModel.findOne({ 
                login: username, 
                deleted: false 
            }).lean();
            
            console.log(`Repository - findByLogin: ${username} - Found: ${!!doc}`);
            
            return doc ? new UserEntity(doc) : null;
        } catch (error) {
            console.error(`Repository - findByLogin error:`, error);
            throw new CustomError(
                error instanceof Error ? error.message : "Unknown error",
                HttpStatusCode.INTERNAL_SERVER
            );
        }
    }

    async findAll(): Promise<UserEntity[]> {
        try {
            const docs = await UserModel.find({ deleted: false }).lean();
            return docs.map(doc => new UserEntity(doc));
        } catch (error) {
            throw new CustomError(
                error instanceof Error ? error.message : "Unknown error",
                HttpStatusCode.INTERNAL_SERVER
            );
        }
    }

    async save(user: UserEntity): Promise<UserEntity> {
        try {
            const existingUser = await UserModel.findOne({ login: user.login }).lean();
            
            if (existingUser) {
                console.log(`User ${user.login} already exists in database`);
                return new UserEntity(existingUser);
            }
            
            console.log(`Saving new user: ${user.login}`);
            const userDoc = new UserModel(user.toObject());
            await userDoc.save();
            return new UserEntity(userDoc.toObject());
        } catch (error) {
            console.error(`Save user error:`, error);
            throw new CustomError(
                error instanceof Error ? error.message : "Unknown error",
                HttpStatusCode.INTERNAL_SERVER
            );
        }
    }

    async softDelete(username: string): Promise<void> {
        try {
            const result = await UserModel.updateMany(
                { login: username }, 
                { deleted: true }
            );
            
            if (result.matchedCount === 0) {
                throw new CustomError("User not found", HttpStatusCode.NOT_FOUND);
            }
        } catch (error) {
            throw error instanceof CustomError
                ? error
                : new CustomError(
                    error instanceof Error ? error.message : "Unknown error",
                    HttpStatusCode.INTERNAL_SERVER
                );
        }
    }

    async update(username: string, updateData: Partial<IUserProps>): Promise<UserEntity> {
        try {
            const result = await UserModel.findOneAndUpdate(
                { login: username, deleted: false },
                { $set: updateData },
                { new: true }
            ).lean();
            
            if (!result) {
                throw new CustomError("User not found", HttpStatusCode.NOT_FOUND);
            }
            
            return new UserEntity(result);
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