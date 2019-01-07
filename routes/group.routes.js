import { Router } from 'express';
import Validation from 'express-validation';
import GroupValidate from '../validators/group.validator';
import GroupController from '../controllers/group.controller';

const router = new Router();

router.get('/api/group', GroupController.getGroups);
router.post('/api/group', Validation(GroupValidate.dataGroup), GroupController.newGroup);
router.post('/api/group/addMembers/:id', [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.addMembers);
router.delete('/api/group/deletemeMembers/:id', [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.deleteMembers);
router.delete('/api/group/:id', Validation(GroupValidate.groupId), GroupController.deleteGroup);

export default router;