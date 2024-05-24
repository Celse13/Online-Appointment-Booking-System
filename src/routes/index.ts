import authRouter from "./auth/auth";
import { Router } from "express";
import userRouter from "./users/users";

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;