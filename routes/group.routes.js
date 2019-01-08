import { Router } from 'express';
import Validation from 'express-validation';
import Author from '../managements/middleware/Authorrization';
import GroupValidate from '../validators/group.validator';
import GroupController from '../controllers/group.controller';

const router = new Router();

router.get('/api/group', Author('admin', 'member'), GroupController.getGroups);
router.post('/api/group', Author('admin', 'member'), Validation(GroupValidate.dataGroup), GroupController.newGroup);
router.post('/api/group/addMembers/:id', Author('admin', 'member'), [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.addMembers);
router.delete('/api/group/deletemeMembers/:id', Author('admin'), [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.deleteMembers);
router.delete('/api/group/:id', Author('admin'), Validation(GroupValidate.groupId), GroupController.deleteGroup);

export default router;