import { Router } from 'express';
import * as users from './users.controller';

const router = Router();

router.route('/auth/register').get(users.register);

export default router;
