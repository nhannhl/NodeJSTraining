'use strict';
import Joi from 'joi';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/;
const GroupValidate = {};

GroupValidate.dataGroup = {
    body: {
        name: Joi.string().required().min(1).max(127),
        lastMessage: Joi.string().regex(objectIdRegex).default(null),
        author: Joi.string().required().regex(objectIdRegex),
        members: Joi.array().items(Joi.string().regex(objectIdRegex)).default(null),
        deletedAt: Joi.allow(null).valid(null).default(null)
    }
}

GroupValidate.groupId = {
    params: {
        id: Joi.string().regex(objectIdRegex)
    }
}

GroupValidate.addDeleteMembers = {
    body: {
        members: Joi.array().items(Joi.string().regex(objectIdRegex)).default(null),
    }
}

export default GroupValidate;