import express from "express";
import { friendsController } from "../../config/container"; 

const friendsRouter = express.Router();

friendsRouter.post("/:username", friendsController.findAndSaveFriends);

export default friendsRouter;
