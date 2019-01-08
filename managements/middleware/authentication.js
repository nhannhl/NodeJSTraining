import jwt from 'jsonwebtoken';
import config from '../../config/index';

export default async (req, res, next) => {
    try {
		var token = req.body.token || req.params.token || req.query.token || req.headers.token;
		if (token) {
			let secretKey = await config.secretKey();
			jwt.verify(token, secretKey);
			return next();
		}
		return next(new Error("No token provided"));
	} catch(err) {
		return next(err);
	}
};