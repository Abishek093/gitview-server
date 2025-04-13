import { Router } from "express";
import userRouter from "./user.routes";
import friendsRouter from "./friends.routes";
import repoRouter from "./repo.routes";

const router = Router()

router.use('/users', userRouter)
router.use('/friends', friendsRouter)
router.use('/repos', repoRouter)
export default router