// routes/user.router.ts
import { Router } from "express";
import { userController } from "../../config/container";
import { handleValidation } from "../../middlewares/validate"; 
import {
  sortUsersValidator,
  searchUsersValidator,
  saveUserValidator,
  updateUserValidator,
  deleteUserValidator
} from '../../validators/userValidators'

const userRouter = Router();

userRouter.get('/sort', sortUsersValidator, handleValidation, userController.getAllSortedUsers);
userRouter.get('/search', searchUsersValidator, handleValidation, userController.searchUsers);
userRouter.get('/:username', saveUserValidator, handleValidation, userController.saveUser);
userRouter.put('/:username', updateUserValidator, handleValidation, userController.updateUser);
userRouter.delete('/:username', deleteUserValidator, handleValidation, userController.deleteUser);
userRouter.get('/', userController.getAllUsers);

export default userRouter;
