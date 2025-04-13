import { inject, injectable } from "tsyringe";
import { IFriendsInteractor } from "../interactor/IFriendsInteractor";
import { Request, Response, NextFunction } from "express";

@injectable()
export class FriendsController {
  constructor(
    @inject("IFriendsInteractor") private friendsInteractor: IFriendsInteractor
  ) {}

  findAndSaveFriends = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;

    try {
      const friends = await this.friendsInteractor.findAndSaveFriends(username);
      res.status(200).json({ count: friends.length, friends });
    } catch (error) {
      next(error);
    }
  };
}
