import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
        max: [255, 'firstName is too long']
    },
    lastName: {
        type: String,
        required: [true, 'firstName is required'],
        max: [255, 'firstName is too long'],
        uppercase: true,
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
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

userSchema.virtual('fullName').get(() => {
    return `${this.firstName} ${this.lastName}`;
})

let User = mongoose.model('User', userSchema);

export default User;