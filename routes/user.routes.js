import { Router } from 'express';
import Validation from 'express-validation';
import Autho from '../managements/middleware/authorization';
import UserValidate from '../validators/user.validator';
import UserController from '../controllers/user.controller';

const router = new Router();

router.get('/api/user', Autho("admin", "member"), UserController.getUsers);
router.post('/api/user/:id', Autho("admin"), [Validation(UserValidate.userId), Validation(UserValidate.datalUser)], UserController.editUser);
router.delete('/api/user/:id', Autho("admin"), Validation(UserValidate.userId), UserController.deletetUser);

router.post('/api/testParam', UserController.testParam);


export default router;