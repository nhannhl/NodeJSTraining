import { Router } from 'express';
import Validation from 'express-validation';
import UserValidate from '../validators/user.validator';
import UserController from '../controllers/user.controller';

const router = new Router();

router.get('/api/user', UserController.getUsers);
router.post('/api/user/:id', [Validation(UserValidate.userId), Validation(UserValidate.datalUser)], UserController.editUser);
router.delete('/api/user/:id', Validation(UserValidate.userId), UserController.deletetUser);


export default router;