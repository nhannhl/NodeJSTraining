'use strict';
import Joi from 'joi';

const UserValidate = {}

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

export default UserValidate;
