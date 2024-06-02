import authRouter from './auth/auth';
import { Router } from 'express';
import userRouter from './users/users';
import adminRouter from './admin/admin';
import servicesRouter from './services/services'
import businessRouter from './business/business';
import appointmentRouter from './appointments/appointments';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/service', servicesRouter);
router.use('/business', businessRouter);
router.use('/appointments', appointmentRouter)


export default router;
