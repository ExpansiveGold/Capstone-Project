import express from 'express';
import db from '../server.js'
import Friends from '../models/friends.model.js';

const router = express.Router()
const FriendColl = db().collection("Friends")

// +--------------------+
// | User Friends Route |
// +--------------------+

//TODO: Integrate with database
// /user/:id/friends
router.route("/:id/friends")
    .get(async (req, res) => {
        const id = req.params['id']
        var query = { $or: [{ userId: id }, { friendId: id } ]}

        //Fetch data from database
        var friend = await FriendColl.find(query).toArray((err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        res.status(200).send(friend)
    })

router.route("/:id/friends/add/:friendId")
    .post(async (req, res) => {
        const id = req.params['id']
        const friendId = req.params['friendId']

        if (id == friendId) {
            res.status(500).json({ message: 'You cannot add yourself as friend' })
        } else {
            var query = { 
                $or: [
                    { 
                        userId: id, 
                        friendId: friendId
                    },
                    { 
                        userId: friendId, 
                        friendId: id 
                    } 
                ]
            }
            // Check if friend is already added
            var check = await FriendColl.find(query).toArray((err, res) => {
                if (err) throw err;
                console.log(res)
                db.close()
            })

            // If NULL, no friend found on database
            if (check.length === 0) {
                // if (check === null) {
                    // add friend
                var newFriend = new Friends({
                    userId: id,
                    friendId: friendId
                })
                var friend = await FriendColl.insertOne(newFriend);
                res.status(200).json(friend)
            } else {
                res.status(500).json({ message: 'You already added this user as friend' })
            }
        }
    })

router.route("/:id/friends/remove/:friendId")
    .delete(async (req, res) => {
        const id = req.params['id']
        const friendId = req.params['friendId']

        if (id == friendId) {
            res.status(500).json({ message: 'You cannot remove yourself as friend' })
        } else {
            var query = { 
                $or: [
                    { 
                        userId: id, 
                        friendId: friendId
                    },
                    { 
                        userId: friendId, 
                        friendId: id 
                    } 
                ]
            }
            // Check if friend is already added
            var check = await FriendColl.find(query).toArray((err, res) => {
                if (err) throw err;
                console.log(res)
                db.close()
            })

            // If not NULL, friend found on database, procede to delete
            if (check.length !== 0) {
                // delete friend
                var friend = await FriendColl.deleteOne(query, (err, res) => {
                    if (err) throw err;
                    console.log(res)
                    db.close()
                })
                res.status(200).json(friend)
            } else {
                res.send(500).json({ message: 'Friend not found' })
            }
        }
    })

export default router;