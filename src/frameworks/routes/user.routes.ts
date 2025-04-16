import { Router } from "express";
import { userController } from "../../config/container";


const userRouter = Router()

userRouter.get('/:username', userController.saveUser)
userRouter.get('/', userController.getAllUsers); 
userRouter.delete('/:username', userController.deleteUser);

export default userRouter