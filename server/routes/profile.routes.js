import express from 'express';
import db from '../server.js'
import { ObjectId } from 'mongodb';
// import mongo from 'mongodb';
import bcrypt from 'bcrypt';

const router = express.Router()
const UserColl = db().collection("Users")

// +--------------------+
// | User Profile Route |
// +--------------------+

//TODO: Integrate with database
// /user/:id
router.route("/:id")
    .get(async (req, res) => {
        // var query = { _id: req.params['id'] }
        var query = { _id: new ObjectId(req.params['id']) }
        var user = await UserColl.findOne(query)
        if (user === null) {
            res.status(500).json({message: 'Error finding user'})
        } else {
            res.status(200).json(user)
        }
    })

router.route("/:id/change_password")
    .post(async (req, res) => {
        // get info send by user
        const info = req.body
        
        // Get user info
        var query = { _id: new ObjectId(req.params['id']) }
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

router.route("/:id/delete_account")
    .delete(async (req, res) => {
        // get info send by user
        const { password } = req.body
        
        // Get user info
        var query = { _id: new ObjectId(req.params['id']) }
        var user = await UserColl.findOne(query)
        
        if (!user) return res.status(400).json({message: 'Error while deleting account'})

        // check password
        const validPass = bcrypt.compare(String(password), user.password)
        if (!validPass) return res.status(400).json({message: 'Invalid password.'})

        var userDel = await UserColl.findOneAndDelete(query)

        if (!userDel) return res.status(500).json({ message: 'An unxpected error happend. Try again later.' })
        
        res.status(200).json(userDel)
    })

export default router;