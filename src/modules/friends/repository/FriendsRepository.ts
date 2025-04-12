import { injectable } from "tsyringe";
import { IUserRepository } from "./IFriendsRepository";
import { UserEntity } from "../entity/FriendsEntity";
import UserModel from "./FriendsModel";
import CustomError from "../../../errors/customError";
import HttpStatusCode from "../../../errors/httpStatusCodes";

@injectable()
export class UserRepository implements IUserRepository {

    async findByLogin(username: string): Promise<UserEntity | null> {
        try {
            const doc = await UserModel.findOne({ login: username, deleted: false }).lean();
            console.log("From DB: ", doc)
            return doc ? new UserEntity(doc) : null;
        } catch (error) {
            throw new CustomError(
                error instanceof Error ? error.message : "Unknown error",
                HttpStatusCode.INTERNAL_SERVER
            );
        }
    }

    async save(user: UserEntity): Promise<UserEntity> {
        try {
            const userDoc = new UserModel(user.toObject());
            await userDoc.save();
            return new UserEntity(userDoc.toObject());
        } catch (error) {
            throw new CustomError(
                error instanceof Error ? error.message : "Unknown error",
                HttpStatusCode.INTERNAL_SERVER
            );
        }
    }
}