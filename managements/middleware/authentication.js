import jwt from 'jsonwebtoken';
import config from '../../config/index';

export default (req, res, next) => {
    try {
		var token = req.body.token || req.param.token || req.query.token || req.headers.token;
		if (token) {
			jwt.verify(token, config.secretKey);
			return next();
		}
		return next(new Error("No token provided"));
	} catch(err) {
		return next(err);
	}
};