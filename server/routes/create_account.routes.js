import express from 'express';
import db from '../server.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const router = express.Router()

const UserColl = db().collection("Users")
UserColl.createIndex({ 'email': 1 }, { unique: true })

router.route("/")
    .post((req, res) => {
        // get info send by user
        const info = req.body
        // define salt rounds(how secure the encryption is)
        const saltRounds = 10
        // generate salt
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                res.status(500).json({message: err.message})
            }
            // Hash password
            bcrypt.hash(String(info.password), salt, async (err, hash) => {
                if (err) {
                    res.status(500).json({message: err.message})
                }
                
                // Create user object
                const NewUser = new User({
                    username: info.username,
                    email: info.email,
                    password: hash,
                    isAdmin: info.isAdmin,
                    isBanned: info.isBanned,
                    creationDate: Date()
                })
                // Insert user in database, catch for errors
                try {
                    const user = await UserColl.insertOne(NewUser);
                    res.status(200).json(user)
                } catch (error) {
                    res.status(500).json({message: error.message})
                }
            })
        })
    })

export default router;