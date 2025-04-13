import express from "express";
import { friendsController } from "../../config/container"; 

const friendsRouter = express.Router();

friendsRouter.get("/:username/followers", friendsController.findAndSaveFriends);
friendsRouter.get("/:username", friendsController.getFriendsForUser);


export default friendsRouter;
