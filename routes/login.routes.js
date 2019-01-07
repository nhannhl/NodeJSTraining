import { Router } from 'express';
import Validation from 'express-validation';
import LoginValidate from '../validators/login.validator';
import LoginController from '../controllers/login.controller';

const router = new Router();

router.post('/api/login', Validation(LoginValidate.dataLogin), LoginController.login);

export default router;