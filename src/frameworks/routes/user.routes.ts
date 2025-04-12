import { Router } from "express";
import { userController } from "../../config/container";


const userRouter = Router()

userRouter.get('/:username', userController.saveUser)

export default userRouter