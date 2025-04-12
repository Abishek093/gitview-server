import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from '../modules/user/repository/IUserRepository';
import { UserRepository } from '../modules/user/repository/UserRepository';
import { IUserInteractor } from '../modules/user/interactor/IUserInteractor';
import { UserInteractor } from '../modules/user/interactor/UserInteractor';
import { UserController } from '../modules/user/controller/UserController';
import { GitHubService } from '../modules/user/service/GitHubService';


container.register(GitHubService, { useClass: GitHubService });
container.register<IUserRepository>('IUserRepository', {useClass: UserRepository})
container.register<IUserInteractor>("IUserInteractor", { useClass: UserInteractor });
container.register(UserController, { useClass: UserController });

export const userController = container.resolve(UserController);


export default container;