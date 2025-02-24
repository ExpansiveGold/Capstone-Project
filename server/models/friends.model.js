import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true]

        },

        friendId: {
            type: String,
            required: [true]
        }
    },

    {
        Timestamp: true
    }
);

const Friend = mongoose.model('Friend', FriendSchema);

export default Friend;