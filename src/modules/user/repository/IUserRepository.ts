import { IUserProps, UserEntity } from "../entity/UserEntity";

export interface IUserRepository{
    findByLogin(username: string): Promise<UserEntity | null>;
    findAll(): Promise<UserEntity[]>;
    save(user: UserEntity): Promise<UserEntity>;
    softDelete(username: string): Promise<void>;
    update(username: string, updateData: Partial<IUserProps>): Promise<UserEntity>;
    search(filters: Record<string, any>): Promise<UserEntity[]>
    findAllSorted(sortField?: string, sortOrder?: number): Promise<UserEntity[]>;

}