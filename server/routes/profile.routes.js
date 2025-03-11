import express from 'express';
import db from '../server.js'
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { verifyToken } from '../utils/jwtHelper.js';

const router = express.Router()
const UserColl = db().collection("Users")

// +--------------------+
// | User Profile Route |
// +--------------------+

//TODO: Integrate with database
// /user/:id
router.route("/")
    .post(async (req, res) => {
        const token = req.body.token
        if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
        const verified = verifyToken(token)
        var query = { _id: new ObjectId(`${verified.id}`) }
        var user = await UserColl.findOne(query)
        if (user === null) {
            res.status(500).json({message: 'Error finding user'})
        } else {
            res.status(200).json(user)
        }
    })

router.route("/change_password")
    .post(async (req, res) => {
        // get info send by user
        const token = req.body.token
        if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
        const verified = verifyToken(token)
        
        // Get user info
        var query = { _id: new ObjectId(`${verified.id}`) }
        var user = await UserColl.findOne(query)
        
        if (user === null) {
            res.status(500).json({message: 'Error finding user'})
        } else if (info.password == info.newPassword){
            res.status(500).json({message: 'Cannot change password to the same value'})
        } else {
            // check password
            bcrypt.compare(String(info.password), user.password, (err, result) => {
                if (err) {
                    res.status(500).json({message: err.message})
                }
                // User found
                if (result) {
                    // define salt rounds(how secure the encryption is)
                    const saltRounds = 10
                    
                    // generate salt
                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        if (err) {
                            res.status(500).json({message: err.message})
                        }
                        // Hash password
                        bcrypt.hash(String(info.newPassword), salt, async (err, hash) => {
                            if (err) {
                                res.status(500).json({message: err.message})
                            }
                            // Update in database, catch for errors
                            try {
                                const user = await UserColl.updateOne(
                                    query ,
                                    {
                                        $set: { 'password': hash }
                                    }
                                );
                                res.status(200).json(user)
                            } catch (error) {
                                res.status(500).json({message: error.message})
                            }
                        })
                    })

                } else {
                    res.status(500).json({message: 'Invalid Password'})
                }
            })
        }
        // res.send('Password changed')
    })

router.route("/delete_account")
    .delete(async (req, res) => {
        // get info send by user
        const token = req.body.token
        if (token === null) return res.status(403).send({ message: 'Invalid Authentication'})
        const password = req.body.password
        const verified = verifyToken(token)
        
        // Get user info
        var query = { _id: new ObjectId(`${verified.id}`) }
        var user = await UserColl.findOne(query)
        
        if (!user) return res.status(400).json({message: 'Error while deleting account'})
            
        // check password
        bcrypt.compare(String(password), user.password, async (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            if (result) {
                var userDel = await UserColl.findOneAndDelete(query)
                
                if (!userDel) return res.status(500).json({ message: 'An unxpected error happend. Try again later.' })
                    
                res.status(200).json(userDel)
                // } else {
                //     return res.status(400).json({message: 'Invalid username or password.'})
                // }
            } else {
                return res.status(400).json({message: 'Invalid password.'})
            }
        })
    })

export default router;