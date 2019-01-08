import { Router } from 'express';
import Validation from 'express-validation';
import Autho from '../managements/middleware/authorization';
import GroupValidate from '../validators/group.validator';
import GroupController from '../controllers/group.controller';

const router = new Router();

router.get('/api/group', Autho("admin", "member"), GroupController.getGroups);
router.post('/api/group', Autho("admin", "member"), Validation(GroupValidate.dataGroup), GroupController.newGroup);
router.post('/api/group/addMembers/:id', Autho("admin", "member"), [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.addMembers);
router.delete('/api/group/deletemeMembers/:id', Autho("admin"), [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.deleteMembers);
router.delete('/api/group/:id', Autho("admin"), Validation(GroupValidate.groupId), GroupController.deleteGroup);

export default router;