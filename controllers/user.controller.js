import UserModel from '../models/user';

const UserController = {};

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
        return res.status(200).json({ isSuccess: true, data: req.body });
    } catch(err) {
        return next(err);
    }
};

export default UserController;
