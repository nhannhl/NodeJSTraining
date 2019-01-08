import { Router } from 'express';
import Validation from 'express-validation';
import LoginValidate from '../validators/login.validator';
import LoginController from '../controllers/login.controller';
import UserValidate from '../validators/user.validator';

const router = new Router();

router.post('/api/login', Validation(LoginValidate.dataLogin), LoginController.login);
router.post('/api/createUser', Validation(UserValidate.datalUser), LoginController.createUser);

export default router;