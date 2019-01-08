import { Router } from 'express';
import InstallDb from '../controllers/installdb.controller';

const router = new Router();

router.get('/installUser', InstallDb.installUser);

export default router;