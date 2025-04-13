import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from '../modules/user/repository/IUserRepository';
import { UserRepository } from '../modules/user/repository/UserRepository';
import { IUserInteractor } from '../modules/user/interactor/IUserInteractor';
import { UserInteractor } from '../modules/user/interactor/UserInteractor';
import { UserController } from '../modules/user/controller/UserController';
import { UserGitHubService } from '../modules/user/service/UserGitHubService';
import { IFriendsRepository } from '../modules/friends/repository/IFriendsRepository';
import { FriendsRepository } from '../modules/friends/repository/FriendsRepository';
import { IFriendsInteractor } from '../modules/friends/interactor/IFriendsInteractor';
import { FriendsInteractor } from '../modules/friends/interactor/FriendsInteractor';
import { FriendsController } from '../modules/friends/controller/FriendsController';


container.register(UserGitHubService, { useClass: UserGitHubService });
container.register<IUserRepository>('IUserRepository', {useClass: UserRepository})
container.register<IUserInteractor>("IUserInteractor", { useClass: UserInteractor });
container.register(UserController, { useClass: UserController });

container.register<IFriendsRepository>('IFriendsRepository', {useClass: FriendsRepository})
container.register<IFriendsInteractor>("IFriendsInteractor", { useClass: FriendsInteractor });
container.register(FriendsController, { useClass: FriendsController });



export const userController = container.resolve(UserController);
export const friendsController = container.resolve(FriendsController);


export default container;