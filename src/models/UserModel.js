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
    registerNo: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    category: String,
    group: {
      type: String,
    },
    boardOfStudy: {
      type: String,
    },
    district: String,
    pincode: String,
    dob: Date,
    imageURL: String,
    cutoff: [
      {
        physics: Number,
        chemistry: Number,
        maths: Number
      }
    ]
  },
  { timestamps: true }
);

const UserModel = models['user'] || model('user', UserSchema);

export default UserModel;