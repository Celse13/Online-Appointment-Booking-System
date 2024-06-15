import { Router } from 'express';
import BusinessController from '../../controllers/businessControllers';
import authenticate from '../../utils/authenticate';
import { checkRole } from '../../utils/isBusiness';
import clientControllers from '../../controllers/clientControllers';

const router = Router();

router.post(
  '/',
  authenticate,
  checkRole(['business', 'staff']),
  BusinessController.createBusiness,
);
router.get(
  '/:id',
  authenticate,
  checkRole(['business', 'staff']),
  BusinessController.getBusiness,
);
router.patch(
  '/:id',
  authenticate,
  checkRole(['business', 'staff']),
  BusinessController.updateBusiness,
);
router.delete(
  '/:id',
  authenticate,
  checkRole(['business', 'staff']),
  BusinessController.deleteBusiness,
);


export default router;
