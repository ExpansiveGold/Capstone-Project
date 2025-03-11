import express from 'express';
import db from '../server.js'
import { ObjectId } from 'mongodb';
import { verifyToken } from '../utils/jwtHelper.js';

const router = express.Router()
const FullColl = db().collection('fullMatch')

// db().createCollection('fullMatch', {
//     viewOn: 'Matches',
//     pipeline: [
//         {
//             '$lookup': {
//                 'from': 'Users', 
//                 'localField': 'white', 
//                 'foreignField': '_id', 
//                 'as': 'whitePlayer'
//             }
//         }, 
//         {
//             '$lookup': {
//                 'from': 'Users', 
//                 'localField': 'black', 
//                 'foreignField': '_id', 
//                 'as': 'blackPlayer'
//             }
//         }, 
//         {
//             '$unwind': {
//                 'path': '$whitePlayer'
//             }
//         }, 
//         {
//             '$unwind': {
//                 'path': '$blackPlayer'
//             }
//         }, 
//         {
//             '$project': {
//                 '_id': 1, 
//                 'whitePlayer': '$whitePlayer.username', 
//                 'blackPlayer': '$blackPlayer.username', 
//                 'white': 1,
//                 'black': 1,
//                 'moves': 1, 
//                 'movesPgn': 1, 
//                 'result': 1,
//                 'duration': 1,
//                 'hash': 1
//             }
//         }
//     ]
// })

// +--------------------+
// | User History Route |
// +--------------------+

router.route("/history") // /user/:id/history
.post(async (req, res) => {
    const token = req.body.token
    if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
    const verified = verifyToken(token)
    var query = { $or: [{ white: new ObjectId(`${verified.id}`) }, { black: new ObjectId(`${verified.id}`) }]}

    //Fetch data from database
    var matches = await FullColl.find(query).toArray((err, res) => {
        if (err) throw err;
        console.log(res)
        db.close()
    })
    res.status(200).send({
        user: verified,
        matches: matches
    })
})

export default router;