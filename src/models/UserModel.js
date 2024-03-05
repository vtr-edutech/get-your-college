import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    name: String,
    mobile: {
        type: String,
        maxLength: 10
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    lastOTP: String,
    firstName: String,
    lastName: String,
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    email: String,
    emailVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const UserModel = models['user'] || model('user', UserSchema);

export default UserModel;