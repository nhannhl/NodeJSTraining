import bcrypt from 'bcrypt';
import config from '../config/index';
import UserModel from '../models/user';

const UserController = {};

const checkDataUser = function(data) {
    if (!data.fullName.first || !data.fullName.last || !data.password) {
        return false;
    }

    if (data.deletedAt !== null) {
        return false;
    }

    return true;
};

UserController.getUsers = async (req, res, next) => {
    try {
        let users = await UserModel.find();
        return res.status(200).json({ isSuccess: true, data: users });
    } catch(err) {
        return next(err);
    }
};

UserController.addUser = async (req, res, next) => {
    try {
        if (!checkDataUser(req.body)){
            return next(new Error('Validate error'));
        }
        req.body.password = await bcrypt.hashSync(req.body.password, config.saltRound);
        let user = new UserModel(req.body);
        await user.save();
        return res.status(200).json({ isSuccess: true, data: user });
    } catch(err) {
        return next(err);
    }
};

UserController.editUser = async (req, res, next) => {
    try {
        if (!checkDataUser(req.body)){
            return next(new Error('Validate error'));
        }
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            return next(new Error('userId not exist'));
        }
        req.body.password = await bcrypt.hashSync(req.body.password, config.saltRound);
        user.set(req.body);
        await user.save();
        return res.status(200).json({ isSuccess: true, data: user });
    } catch(err) {
        return next(err);
    }
}

UserController.deletetUser = async (req, res, next) => {
    try {
        let user = await UserModel.findById(req.params.id);
        if (!user) {
            return next(new Error('userId not exist'));
        }
        user.deletedAt = Date.now();
        await user.save();
        return res.status(200).json({ isSuccess: true, data: user });
    } catch(err) {
        return next(err);
    }
}

UserController.changeUserPass = async (req, res, next) => {
    try {
        let user = await UserModel.findById(req.headers.currentId);
        if (!user) {
            return next(new Error('Unknow error'));
        }
        user.password = await bcrypt.hashSync(req.body.password, config.saltRound);
        await user.save();
        return res.status(200).json({ isSuccess: true, data: user });
    } catch(err) {
        return next(err);
    }
}

export default UserController;
