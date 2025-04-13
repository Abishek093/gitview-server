// import { inject, injectable } from "tsyringe";
// import { ISearchInteractor } from "../interactor/ISearchInteractor";
// import { NextFunction, Request, Response } from "express";

// @injectable()
// export class SearchController {
//   constructor(@inject("ISearchInteractor") private searchInteractor: ISearchInteractor) {}

//   searchUsers = async (req: Request, res: Response, next: NextFunction) => {
//     const { username, location } = req.query;

//     try {
//       const users = await this.searchInteractor.searchUsers({
//         username: username as string,
//         location: location as string
//       });
//       res.status(200).json(users);
//     } catch (error) {
//       next(error);
//     }
//   };
// }
