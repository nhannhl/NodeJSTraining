'use strict';
import Joi from 'joi';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/;
const UserValidate = {};

UserValidate.datalUser = {
    body: {
        fullName: Joi.object().keys({
            first: Joi.string().required().max(255),
            last: Joi.string().required().max(255)
        }),
        email: Joi.string().allow(null).regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).default(null),
        password: Joi.string().required().min(6).max(127),
        gender: Joi.bool().allow(null).default(true),
        age: Joi.number().allow(null).integer().default(null),
        deletedAt: Joi.valid(null).allow(null).default(null)
    }
}

UserValidate.userId = {
    params: {
        id: Joi.string().regex(objectIdRegex)
    },
    query: {
        id: Joi.string().regex(objectIdRegex)
    }
}

export default UserValidate;
