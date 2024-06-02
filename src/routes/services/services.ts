import { Router } from 'express';
import ServiceController from '../../controllers/serviceControllers';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';

const router = Router();

// Service routes
router.post('/', authenticate, checkRole(['business', 'staff']), ServiceController.createService);
router.put('/:id', authenticate, checkRole(['business', 'staff']),  ServiceController.updateService);
router.delete('/:id', authenticate, checkRole(['business', 'staff']),  ServiceController.deleteService);
router.get('/', authenticate, checkRole(['business', 'client', 'staff']), ServiceController.getServices);
router.get('/:id', authenticate, checkRole(['business', 'client', 'staff']), ServiceController.getService);


export default router;

