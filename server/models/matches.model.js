import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
    {
        white: {
            type: String,
            required: [true, 'Please enter an username']
        },

        black: {
            type: String,
            required: [true, 'Please enter an username']
        },

        moves: {
            type: Array,
            required: [true, 'Please enter the move list']
        },

        movesPgn: {
            type: String,
            required: [true, 'Please enter the move list']
        },

        result: {
            type: String,
            required: [true, 'Please enter a result, [piece color or draw]']
        },

        creationDate: {
            type: Date
        },

        duration: {
            type: Date
        },

        place: {
            type: String
        },

        tournament: {
            type: String
        },

        hash: {
            type: String,
            required: [true]
        }
    },

    {
        Timestamp: true
    }
);

const Match = mongoose.model('Match', MatchSchema);

export default Match;