'use strict';
import Joi from 'joi';

const LoginValidate = {};

LoginValidate.dataLogin = {
    email: Joi.string().required().regex(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/),
    password: Joi.string().required().min(6).max(127),
}

export default LoginValidate;