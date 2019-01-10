import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index';
import UserModel from '../models/user';
import UserController from '../controllers/user.controller';

const LoginController = {};

LoginController.login = async (req, res, next) => {
    try {
        let user = await UserModel.findOne({email: req.body.email}).select('-_id email');
        if (!user) {
            return next(new Error('Data not exist'));
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return next(new Error('Email/password wrong'));
        }
        let secretKey = await config.secretKey();
        let token = jwt.sign({
            '_id': user._id,
            'email': user.email
        }, secretKey, {
            expiresIn: 86400,
            algorithm: 'RS512'
        });
        return res.status(200).json({ isSuccess: true, token: token });
    } catch(err) {
        return next(err);
    }
};

LoginController.createUser = async (req, res, next) => {
    try {
        await UserController.addUser(req, res, next);
    } catch(err) {
        return next(err);
    }
}

export default LoginController;