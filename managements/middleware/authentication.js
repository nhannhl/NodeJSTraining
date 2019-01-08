import jwt from 'jsonwebtoken';
import config from '../../config/index';
import UserModel from '../../models/user';

export default async (req, res, next) => {
    try {
		const token = req.body.token || req.params.token || req.query.token || req.headers.token;
		if (token) {
			const publicKey = await config.publicKey();
			const data = jwt.verify(token, publicKey);
			const user = await UserModel.findOne({_id: data._id});
			if (!user) {
				return next(new Error('_id not exist'));
			}
			req.headers.roleUser = user.role;
			req.headers.currentId = data._id;
			return next();
		}
		return next(new Error('No token provided'));
	} catch(err) {
		return next(err);
	}
};