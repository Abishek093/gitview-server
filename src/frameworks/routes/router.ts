import { Router } from "express";
import userRouter from "./user.routes";
import friendsRouter from "./friends.routes";

const router = Router()

router.use('/users', userRouter)
router.use('/friends', friendsRouter)

export default router