import { Router } from 'express';
import ServiceController from '../../controllers/serviceControllers';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const businessRouter = Router();
const clientRouter = Router();

// Business routes
businessRouter.post(
  '/',
  authenticate,
  checkRole(['business', 'staff']),
  ServiceController.createService,
);
businessRouter.put(
  '/:id',
  authenticate,
  checkRole(['business', 'staff']),
  ServiceController.updateService,
);
businessRouter.delete(
  '/:id',
  authenticate,
  checkRole(['business', 'staff']),
  ServiceController.deleteService,
);

businessRouter.get(
  '/',
  authenticate,
  checkRole(['business', 'client', 'staff']),
  ServiceController.getBusinessServices,
);

// Client routes

clientRouter.get(
  '/',
  authenticate,
  checkRole(['business', 'client', 'staff']),
  ServiceController.getServices,
);
clientRouter.get(
  '/:id',
  authenticate,
  checkRole(['business', 'client', 'staff']),
  ServiceController.getService,
);

export { businessRouter, clientRouter };