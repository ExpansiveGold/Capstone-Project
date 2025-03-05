import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter an username']
        },

        email: {
            type: String,
            required: [true, 'Please enter an email']
        },

        password: {
            type: String,
            required: [true, 'Please enter an password']
        },

        isAdmin: {
            type: Boolean,
            default: false
        },

        isBanned: {
            type: Boolean,
            default: false
        },

        creationDate: {
            type: Date
        }
    },

    {
        Timestamp: true
    }
);

const User = mongoose.model('User', UserSchema);

export default User;