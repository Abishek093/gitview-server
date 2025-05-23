import { UserEntity } from "../entity/UserEntity";

export interface IUserInteractor{
    saveUser(username: string): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    deleteUser(username: string): Promise<void>;
    updateUser(username: string, updateData: Record<string, any>): Promise<UserEntity>;
    searchUsers(filters: Record<string, any>): Promise<UserEntity[]>
    getAllSortedUsers(sortField?: string, sortOrder?: number): Promise<UserEntity[]>;
}