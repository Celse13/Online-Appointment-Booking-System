import authRouter from './auth/auth';
import { Router } from 'express';
import userRouter from './users/users';
import adminRouter from './admin/admin';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);

export default router;
