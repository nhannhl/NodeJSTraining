import { Router } from 'express';
import Validation from 'express-validation';
import Author from '../managements/middleware/authorization';
import UserValidate from '../validators/user.validator';
import UserController from '../controllers/user.controller';

const router = new Router();

router.get('/api/user', Author('admin', 'member'), UserController.getUsers);
router.post('/api/user/changepass', [Author('admin', 'member'), Validation(UserValidate.changePass)], UserController.changeUserPass);
router.post('/api/user/:id', [Author('admin'), Validation(UserValidate.userId), Validation(UserValidate.datalUser)], UserController.editUser);
router.delete('/api/user/:id', [Author('admin'), Validation(UserValidate.userId)], UserController.deletetUser);

export default router;