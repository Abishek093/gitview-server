import { inject, injectable } from "tsyringe";
import { IRepoInteractor } from "../interactor/IRepoInteractor"; 
import { NextFunction, Request, Response } from "express";

@injectable()
export class RepoController {
  constructor(@inject("IRepoInteractor") private repoInteractor: IRepoInteractor) {}

  getUserRepos = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 6;
  
    try {
      const repos = await this.repoInteractor.getUserRepos(username, page, perPage);
      res.status(200).json(repos);
    } catch (error) {
      next(error);
    }
  };

  getRepoDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { username, repoName } = req.params;

    try {
      const repo = await this.repoInteractor.getRepoDetails(username, repoName);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };
}