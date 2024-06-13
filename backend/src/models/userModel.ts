import mongoose, { Document, Schema } from 'mongoose';
import crypto from 'crypto';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  verificationToken: string | undefined;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  profilePicture: string;
  businessDescription: string;
  phoneNumber: string;
  location?: string;
  generatePasswordResetToken(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
    },
    verificationToken: { type: String },
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicture: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

// userSchema.post('save', async function(doc: IUser) {
//   if (doc.role === 'business') {
//     const businessDoc = new BusinessModel({
//       owner: doc._id,
//       businessDescription: doc.businessDescription,
//       phoneNumber: doc.phoneNumber,
//       location: doc.location,
//     });
//     await businessDoc.save();
//   }
// });

const UserModel = mongoose.model<IUser>('User', userSchema);
export { userSchema, UserModel };
