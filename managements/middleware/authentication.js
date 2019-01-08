import jwt from 'jsonwebtoken';
import config from '../../config/index';
import UserModel from '../../models/user';

export default async (req, res, next) => {
    try {
		var token = req.body.token || req.params.token || req.query.token || req.headers.token;
		if (token) {
			let publicKey = await config.publicKey();
			let data = jwt.verify(token, publicKey);
			let user = await UserModel.findOne({_id: data._id});
			if (!user) {
				return next(new Error('_id not exist'));
			}
			req.headers.roleUser = user.role;
			return next();
		}
		return next(new Error("No token provided"));
	} catch(err) {
		return next(err);
	}
};