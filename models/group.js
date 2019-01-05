import mongoose from 'mongoose';
import UserModel from '../models/user';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: [true, 'name is unique'],
        max: [127, 'name is too long'],
        min: [1, 'name is too short']
    },
    lastMessage: {
        type: ObjectId
    },
    author: {
        type: ObjectId,
        required: [true, 'author is required'],
        ref: 'User'
    },
    members: [{
        type: ObjectId,
        ref: 'User'
    }],
    deleteAt: {
        type: Date,
        default: null
    }
});

const setDeletedAt = (query) => {
    query.deletedAt = null;
}

groupSchema.pre('find', function() {
    setDeletedAt(this.getQuery());
});

groupSchema.pre('findOne', function() {
    setDeletedAt(this.getQuery());
});

groupSchema.pre('findById', function() {
    setDeletedAt(this.getQuery());
});

groupSchema.pre('save', async function(next) {
    let user = await UserModel.findById(this.author);
    if (user === null) {
        return next(new Error('UserId is not exist'));
    }
    return next();
});

let Group = mongoose.model('Group', groupSchema);

export default Group;