import { Router } from 'express';
import Validation from 'express-validation';
import GroupValidate from '../validators/group.validator';
import GroupController from '../controllers/group.controller';

const router = new Router();

router.get('/groups', GroupController.getGroups);
router.post('/groups', Validation(GroupValidate.dataGroup), GroupController.newGroup);
router.post('/groups/:id', [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.addMembers);
router.delete('/groups/:id', [Validation(GroupValidate.groupId), Validation(GroupValidate.addDeleteMembers)], GroupController.deleteMembers);

export default router;