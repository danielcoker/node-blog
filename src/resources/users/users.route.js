import { Router } from 'express';
import * as users from './users.controller';
import { validateBody } from '../../middlewares'; // eslint-disable-line import/no-cycle

const router = Router();

router.route('/auth/register').get(validateBody('UserSchemas', 'registerSchema'), users.register);

export default router;
