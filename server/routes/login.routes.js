import express from 'express';
// import jwt from 'jsonwebtoken'
import { generateToken } from '../utils/jwtHelper.js'
import db from '../server.js';
import bcrypt from 'bcrypt';

const router = express.Router()

const UserColl = db().collection("Users")

router.route("/")
    .post(async (req, res) => {
        // get info send by user
        const email = req.body.email
        const password = req.body.password

        // Get user info
        var query = { email: email }
        var user = await UserColl.findOne(query)

        // User not found
        if (!user) return res.status(400).json({message: 'Invalid username or password.'})

        if (user.isBanned) return res.status(400).json({message: 'This user is banned'})
        
        // check password
        bcrypt.compare(String(password), user.password, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            if (result) {
                // console.log(process.env.SECRET_KEY, 'test')
                const token = generateToken(user)
                return res.status(200).send({ token: token, message: 'success'})
                // return res.status(200).send(user)
            } else {
                return res.status(400).json({message: 'Invalid username or password.'})
            }

        })
    })

export default router;