import express from 'express';
import db from '../server.js'
import ObjectId from 'mongodb';
// import Match from '../models/matches.model.js';
const DB = db()

const router = express.Router()
const MatchColl = db().collection("Matches")


// var view = MatchColl.aggregate([
// var view = db().createCollection('fullMatch', {
db().createCollection('fullMatch', {
    viewOn: 'Matches',
    pipeline: [
        {
            $lookup:
            {
                from: 'Users',
                localField: 'white',
                foreignField: '_id',
                as: "whitePlayer"
            },
        },
        {  
            $lookup:
            {
                from: 'Users',
                localField: 'black',
                foreignField: '_id',
                as: "blackPlayer"
            }
        },
        {
            $project:
            {
                _id: 0,
                white: '$whitePlayer.username',
                black: '$blackPlayer.username',
                result: 1,
                duration: 1
            }
        },
        {
            $unwind: "$white"
        },
        {
            $unwind: "$black"
        }
    ]
})

// +--------------------+
// | User History Route |
// +--------------------+

router.route("/:id/history") // /user/:id/history
.get(async (req, res) => {
    console.log(db().collection('fullMatch').find({}))
    const id = req.params['id']
    var query = { $or: [{ white: id }, { black: id } ]}

    //Fetch data from database
    var matches = await MatchColl.find(query).toArray((err, res) => {
        if (err) throw err;
        console.log(res)
        db.close()
    })
    res.status(200).send(matches)
})

export default router;