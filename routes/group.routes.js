import { Router } from 'express';
import Validation from 'express-validation';
import GroupValidate from '../validators/group.validator';
import GroupController from '../controllers/group.controller';

const router = new Router();

router.get('/groups', GroupController.getGroups);
router.post('/groups', Validation(GroupValidate.dataGroup), GroupController.newGroup);
router.post('/groups/addMembers/:id', [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.addMembers);
router.delete('/groups/deletemeMembers/:id', [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.deleteMembers);
router.delete('/groups/:id', Validation(GroupValidate.groupId), GroupController.deleteGroup);

export default router;