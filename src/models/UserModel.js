import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema(
  {
    name: String,
    mobile: {
      type: String,
      maxLength: 10,
    },
    isMobileVerified: {
      type: Boolean,
      default: false,
    },
    lastOTP: String,
    firstName: String,
    lastName: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    email: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    category: String,
    group: {
      type: String,
      enum: ["BWM", "CS", "CWCS"],
    },
    address: String,
    imageURL: String
  },
  { timestamps: true }
);

const UserModel = models['user'] || model('user', UserSchema);

export default UserModel;