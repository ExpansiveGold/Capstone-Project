import express from 'express';
import db from '../server.js'
import Friends from '../models/friends.model.js';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../utils/jwtHelper.js';

const router = express.Router()
const FriendColl = db().collection("Friends")
const UserColl = db().collection("Users")

// +--------------------+
// | User Friends Route |
// +--------------------+

// /user/:id/friends
router.route("/friends")
    // get, using post because of axios limitations
    .post(async (req, res) => {
        const token = req.body.token
        if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
        const verified = verifyToken(token)
        console.log(verified)
        var query = { $or: [{ userId: verified.id }, { friendId: verified.id }]}
        var friends = []

        //Fetch data from database
        var friend = await FriendColl.find(query).toArray((err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        // return res.send(friend)

        // Fetch user data
        for (let friendData of friend) {
            if (friendData == null) continue
            if (friendData.userId == verified.id) {
                var user = await UserColl.findOne({ _id: new ObjectId(`${friendData.friendId}`) })
                if (user == null) continue
                // return res.send(user)
                friends = [...friends, user]
            } else if (friendData.friendId == verified.id) {
                var user = await UserColl.findOne({ _id: new ObjectId(`${friendData.userId}`) })
                if (user == null) continue
                // return res.send(user)
                friends = [...friends, user]
            }
            // console.log(friends)
        }

        // res.status(200).send(friend)
        res.status(200).send({
            user: verified,
            friends: friends
        })
    })

router.route("/friends/add/:friendId")
    .post(async (req, res) => {
        const token = req.body.token
        if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
        const verified = verifyToken(token)
        const friendId = req.params['friendId']

        var query = { email: friendId }
        // var query = { _id: id }
        var user = await UserColl.findOne(query)

        if (user == null) {
            res.status(500).json({ message: 'User not found' })
        } else {   
            if (verified.id == user._id) {
                res.status(500).json({ message: 'You cannot add yourself as friend' })
            } else {
                var friendQuery = { 
                    $or: [
                        { 
                            userId: verified.id, 
                            friendId: `${user._id}`
                            // friendId: friendId
                        },
                        { 
                            // userId: friendId, 
                            userId: `${user._id}`, 
                            friendId: verified.id 
                        } 
                    ]
                }
                // Check if friend is already added
                var check = await FriendColl.findOne(friendQuery)
                if (check === null) {
                        // add friend
                    var newFriend = new Friends({
                        userId: verified.id,
                        friendId: `${user._id}`
                        // friendId: friendId
                    })
                    var friend = await FriendColl.insertOne(newFriend);
                    res.status(200).json(friend)
                } else {
                    res.status(500).json({ message: 'You already added this user as friend' })
                }
            }
        }
    })

router.route("/friends/remove/:friendId")
    // delete, using post because of axios limitations
    .post(async (req, res) => {
        const token = req.body.token
        if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
        const verified = verifyToken(token)
        const friendId = req.params['friendId']

        if (verified.id == friendId) {
            res.status(500).json({ message: 'You cannot remove yourself as friend' })
        } else {
            var query = { 
                $or: [
                    { 
                        userId: verified.id, 
                        friendId: friendId
                    },
                    { 
                        userId: friendId, 
                        friendId: verified.id 
                    } 
                ]
            }
            // Check if friend is already added
            var friend = await FriendColl.findOneAndDelete(query)
            
            if (friend === null){
                res.status(500).json({ message: 'Friend not found' })
            } else {
                res.status(200).json(friend)
            }
        }
    })

export default router;