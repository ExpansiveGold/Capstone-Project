import express from 'express';
import db from '../server.js'
import { ObjectId } from 'mongodb';

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

router.route("/:id/history") // /user/:id/history
.get(async (req, res) => {
    const id = req.params['id']
    var query = { $or: [{ white: new ObjectId(id) }, { black: new ObjectId(id) }]}

    //Fetch data from database
    var matches = await FullColl.find(query).toArray((err, res) => {
        if (err) throw err;
        console.log(res)
        db.close()
    })
    res.status(200).send(matches)
})

export default router;