import mongoose from 'mongoose';

// User schema => this is the structure of the user document in the collection
const userSchema = new mongoose.Schema({
    username: {
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
    role: {
        type: String,
        required: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicture: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export { userSchema, UserModel };
