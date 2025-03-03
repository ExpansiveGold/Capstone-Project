import express from 'express';
import db from '../server.js'
import Friends from '../models/friends.model.js';
import { ObjectId } from 'mongodb';

const router = express.Router()
const FriendColl = db().collection("Friends")
const UserColl = db().collection("Users")

// +--------------------+
// | User Friends Route |
// +--------------------+

//TODO: Integrate with database
// /user/:id/friends
router.route("/:id/friends")
    .get(async (req, res) => {
        const id = req.params['id']
        var query = { $or: [{ userId: id }, { friendId: id } ]}
        var friends = []

        //Fetch data from database
        var friend = await FriendColl.find(query).toArray((err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })

        // Fetch user data
        for (let friendData of friend) {
            if (friendData.userId == id) {
                var user = await UserColl.findOne({ _id: new ObjectId(`${friendData.friendId}`) })
                // res.send(user)
                friends = [...friends, user]
            } else if (friendData.friendId == id) {
                var user = await UserColl.findOne({ _id: new ObjectId(`${friendData.userId}`) })
                // res.send(user)
                friends = [...friends, user]
            }
        }

        // res.status(200).send(friend)
        res.status(200).send(friends)
    })

router.route("/:id/friends/add/:friendId")
    .post(async (req, res) => {
        const id = req.params['id']
        const friendId = req.params['friendId']

        var query = { email: friendId }
        var user = await UserColl.findOne(query)

        if (user == null) {
            res.status(500).json({ message: 'User not found' })
        } else {   
            if (id == user._id) {
                res.status(500).json({ message: 'You cannot add yourself as friend' })
            } else {
                var friendQuery = { 
                    $or: [
                        { 
                            userId: id, 
                            friendId: `${user._id}`
                            // friendId: friendId
                        },
                        { 
                            // userId: friendId, 
                            userId: `${user._id}`, 
                            friendId: id 
                        } 
                    ]
                }
                // Check if friend is already added
                var check = await FriendColl.findOne(friendQuery)
                if (check === null) {
                        // add friend
                    var newFriend = new Friends({
                        userId: id,
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
            var friend = await FriendColl.findOneAndDelete(query)
            
            if (friend === null){
                res.status(500).json({ message: 'Friend not found' })
            } else {
                res.status(200).json(friend)
            }
        }
    })

export default router;