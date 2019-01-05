import GroupModel from '../models/group';
import UserModel from '../models/user';

const GroupController = {};

const checkDataGroup = function(data) {
    if (!data.name || !data.author) {
        return false;
    }

    if (data.deletedAt !== null) {
        return false;
    }

    return true;
};

const checkGroupExist = async function(groupName) {
    let group = await GroupModel.findOne({ name : `${groupName}` });
    if (group !== null) {
        return true;
    }
    return false;
}

const checkMembersOfGroup = async function(members) {
    let users = await UserModel.find({_id: {$in: members}});
    if (users.length !== members.length) {
        return false;
    }
    return true;
};

GroupController.getGroups = async (req, res, next) => {
    try {
        let groups = await GroupModel.find()
                        .populate('User')
                        .populate({ path: 'author', select: 'lastName' })
                        .populate({ path: 'members', select: 'lastName' });
        return res.status(200).json({ isSuccess: true, data: groups });
    } catch(err) {
        return next(err);
    }
};

GroupController.newGroup = async (req, res, next) => {
    try {
        if (!checkDataGroup(req.body)) {
            return next(new Error('Validate error'));
        }
        if (checkGroupExist(req.body.name) === true) {
            return next(new Error('Group is exist'));
        }
        let check = await checkMembersOfGroup(req.body.members);        
        if (!check) {
            return next(new Error('Members not exists'));
        }
        let group = new GroupModel(req.body);
        if (group.members === null) {
            group.members = new Array();
        }
        group.members.push(group.author);
        await group.save();
        return res.status(200).json({ isSuccess: true, data: group });
    } catch(err) {
        return next(err);
    }
};

GroupController.deleteGroup = async (req, res, next) => {
    try {
        let group = await GroupModel.findById(req.params.id);
        if (group === null) {
            return next(new Error('GroupId not exist'));
        }
        group.deletedAt = Date.now();
        await group.save();
        return res.status(200).json({ isSuccess: true, data: group });
    } catch(err) {
        return next(err);
    }
}

GroupController.addMembers = async (req, res, next) => {
    try {
        if (req.body.members === null || req.body.members.length === 0) {
            return res.status(200).json({ isSuccess: true, data: req.body.members });
        }
        if (!req.params.id) {
            return next(new Error('Validate error'));
        }
        let group = await GroupModel.findById(req.params.id);
        if (group === null) {
            return next(new Error('GroupId not exist'));
        }
        let check = await checkMembersOfGroup(req.body.members);        
        if (!check) {
            return next(new Error('Members not exists'));
        }
        for (const element of req.body.members) {
            if (group.members.indexOf(element) === -1) {
                group.members.push(element);
            }
        }
        await group.save();
        return res.status(200).json({ isSuccess: true, data: group });
    } catch(err) {
        return next(err);
    }
}

GroupController.deleteMembers = async (req, res, next) => {
    try {
        if (req.body.members === null || req.body.members.length === 0) {
            return res.status(200).json({ isSuccess: true, data: req.body.members });
        }
        if (!req.params.id) {
            return next(new Error('Validate error'));
        }
        let group = await GroupModel.findById(req.params.id);
        if (group === null) {
            return next(new Error('GroupId not exist'));
        }
        if (req.body.members.indexOf(group.author) !== -1) {
            return next(new Error('Validate error'));
        }
        let ele = null;
        for (let i = 0; i < req.body.members.length; i++) {
            if (group.members.indexOf(req.body.members[i]) !== -1) {
                group.members.splice(i, 1);
                ele = i;
            }
        }
        group.members.splice(ele, 1);
        await group.save();
        return res.status(200).json({ isSuccess: true, data: group });
    } catch(err) {
        return next(err);
    }
}

export default GroupController;