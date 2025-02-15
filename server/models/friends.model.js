import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'Please enter an username']

        },

        friendId: {
            type: String,
            required: [true, 'Please enter an email']
        }
    },

    {
        Timestamp: true
    }
);

const Friend = mongoose.model('Friend', FriendSchema);

export default Friend;