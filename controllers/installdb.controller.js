import UserModel from '../models/user';
import GroupModel from '../models/group';
import config from '../config/index';
import bcrypt from 'bcrypt';

const InstallDbController = {};

InstallDbController.installUser = async (req, res, next) => {
    try {
        //#region install data for Users
        let users = new Array(
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test1' },
                'email': 'userTest1@email.com',
                'gender': 'true',
                'age': 18,
                'deletedAt': null,
                'role': 'admin',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            }),
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test2' },
                'email': 'userTest2@email.com',
                'gender': 'true',
                'age': 19,
                'deletedAt': null,
                'role': 'member',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            }),
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test3' },
                'email': 'userTest3@email.com',
                'gender': 'false',
                'age': 20,
                'deletedAt': null,
                'role': 'member',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            }),
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test4' },
                'email': 'userTest4@email.com',
                'gender': 'false',
                'age': 21,
                'deletedAt': null,
                'role': 'admin',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            }),
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test5' },
                'email': 'userTest5@email.com',
                'gender': 'true',
                'age': 19,
                'deletedAt': null,
                'role': 'member',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            }),
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test6' },
                'email': 'userTest6@email.com',
                'gender': 'false',
                'age': 20,
                'deletedAt': null,
                'role': 'member',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            }),
            new UserModel ({
                'fullName': { 'first': 'user', 'last': 'test7' },
                'email': 'userTest7@email.com',
                'gender': 'true',
                'age': 19,
                'deletedAt': null,
                'role': 'member',
                'password': await bcrypt.hashSync('123456', config.saltRound)
            })
        );
        //#endregion install data for Users
        for (const ele of users) {
            let user = new UserModel(ele);
            await user.save();
        }
        return res.status(200).json({ isSuccess: true });
    } catch(err) {
        return next(err);
    }
}

export default InstallDbController;