import mongoose from 'mongoose';
import config from '../config/index';
const Schema = mongoose.Schema;

let userSchema = new Schema({
    fullName: {    
        first: {
            type: String,
            required: [true, 'firstName is required'],
            max: [255, 'firstName is too long']
        },
        last: {
            type: String,
            required: [true, 'firstName is required'],
            max: [255, 'firstName is too long'],
            uppercase: true,
            trim: true
        }
    },
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        unique: [true, 'Email is exist']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    gender: {
        type: Boolean
    },
    age: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not a integer number!`
        }
    },
    deletedAt: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        validate: {
            validator: function(v) {
                if (config.roleName.indexOf(v) == -1) {
                    return false;
                }
                return true;
            },
            message: props => `${props.value} is not a valid role!`
        }
    }
});

const setDeletedAt = (query) => {
    query.deletedAt = null;
}

userSchema.pre('find', function() {
    setDeletedAt(this.getQuery());
});

userSchema.pre('findOne', function() {
    setDeletedAt(this.getQuery());
});

userSchema.pre('findById', function() {
    setDeletedAt(this.getQuery());
});

// userSchema.virtual('fullName').get(() => {
//     return `${this.firstName} ${this.lastName}`;
// });

let User = mongoose.model('User', userSchema);

export default User;