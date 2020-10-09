import { Router } from 'express';
import * as userController from './users.controller';
import { validateBody } from '../../middlewares'; // eslint-disable-line import/no-cycle

const router = Router();

router.route('/auth/login').post(validateBody('UserSchemas', 'loginSchema'), userController.login);
router
  .route('/auth/register')
  .post(validateBody('UserSchemas', 'registerSchema'), userController.register);

export default router;
