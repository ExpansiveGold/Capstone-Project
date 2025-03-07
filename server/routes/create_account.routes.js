import express from 'express';
import db from '../server.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const router = express.Router()

const UserColl = db().collection("Users")
UserColl.createIndex({ 'email': 1 }, { unique: true })

router.route("/")
    .post(async (req, res) => {
        try {
            // get info send by user
            const info = req.body

            if (info.username == '') return res.status(500).json({message: 'Missing Username'})
            if (info.email == '') return res.status(500).json({message: 'Missing Email'})
            if (info.password == '') return res.status(500).json({message: 'Missing Password'})

            // generate salt
            const salt = await bcrypt.genSalt(10)
                // Hash password
            const hashPass = await bcrypt.hash(String(info.password), salt)
                    
            // Create user object
            const NewUser = new User({
                username: info.username,
                email: info.email,
                password: hashPass,
                isAdmin: false,
                isBanned: false,
                creationDate: Date()
            })

            // Insert user in database
            const user = await UserColl.insertOne(NewUser);
            // res.status(200).json({ 
            //     user: user,
            //     message: "User registered" 
            // })
            res.status(200).send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: error.message })
        }
    })

export default router;