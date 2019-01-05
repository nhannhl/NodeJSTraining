import { Router } from 'express';
import Validation from 'express-validation';
import UserValidate from '../validators/user.validator';
import UserController from '../controllers/user.controller';

const router = new Router();

router.get('/users', UserController.getUsers);
router.post('/users', Validation(UserValidate.datalUser), UserController.addUser);
router.post('/users/:id', [Validation(UserValidate.userId), Validation(UserValidate.datalUser)], UserController.editUser);
router.delete('/users/:id', Validation(UserValidate.userId), UserController.deletetUser);

export default router;