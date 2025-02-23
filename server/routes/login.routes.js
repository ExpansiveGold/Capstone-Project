import express from 'express';
import db from '../server.js';
import bcrypt from 'bcrypt';

const router = express.Router()

const UserColl = db().collection("Users")

router.route("/")
    .post(async (req, res) => {
        // get info send by user
        const info = req.body

        // Get user info
        var query = { email: info.email }
        var user = await UserColl.findOne(query)

        if (user === null) {
            res.status(500).json({message: 'Invalid Email'})
        } else {
            // check password
            bcrypt.compare(String(info.password), user.password, (err, result) => {
                if (err) {
                    res.status(500).json({message: err.message})
                }
                // User found
                if (result) {
                    res.status(200).send(user)
                } else {
                    res.status(500).json({message: 'Invalid Password'})
                }
            })
        }
    })

export default router;