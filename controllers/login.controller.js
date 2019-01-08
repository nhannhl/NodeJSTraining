import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index';
import UserModel from '../models/user';
import UserController from '../controllers/user.controller';

const LoginController = {};

LoginController.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return next(new Error("Email/password missing"));
        }
        let user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return next(new Error("Data not exist"));
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return next(new Error("Email/password wrong"));
        }
        let secretKey = await config.secretKey();
        let token = jwt.sign({
            "_id": user._id,
            "email": user.email
        }, secretKey, {
            expiresIn: 86400
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

LoginController.testKey = async (req, res, next) => {
    try {
        let secret = await config.secretKey();
        let token = jwt.sign({
            "_id": 1
        }, secret, {
            expiresIn: 10,
            algorithm: 'RS512'  
        });
        let publicKey = await config.publicKey();
        jwt.verify(token, publicKey);
        return res.json({token});
    } catch(err) {
        return next(err);
    }
}

export default LoginController;