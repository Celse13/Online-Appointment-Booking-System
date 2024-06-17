import { Router } from 'express';
import authRouter from './auth/auth';
import userRouter from './users/users';
import adminRouter from './admin/admin';
import { businessRouter as businessAppointmentRouter, clientRouter as clientAppointmentRouter } from './appointments/appointments';
import { businessRouter as businessServiceRouter, clientRouter as clientServiceRouter } from './services/services';
import clientRouter from './client/client';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/admin', adminRouter);
router.use('/business/appointments', businessAppointmentRouter);
router.use('/client/appointments', clientAppointmentRouter);
router.use('/business/services', businessServiceRouter);
router.use('/client/services', clientServiceRouter);
router.use('/business/clients', clientRouter);

export default router;
