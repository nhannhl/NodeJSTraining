'use strict';
import Joi from 'joi';

const objectIdRegex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/;
const UserValidate = {};

UserValidate.datalUser = {
    body: {
        firstName: Joi.string().required().max(255),
        lastName: Joi.string().required().max(255),
        email: Joi.string().regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).default(null),
        password: Joi.string().required().min(6).max(127),
        gender: Joi.bool().default(true),
        age: Joi.number().integer().default(null),
        deletedAt: Joi.valid(null).default(null)
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
