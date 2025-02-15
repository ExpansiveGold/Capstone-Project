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

        // check password
        bcrypt.compare(String(info.password), user.password, (err, result) => {
            if (err) {
                res.status(500).json({message: err.message})
            }

            if (result) {
                res.status(200).redirect('/match/play')
            } else {
                res.status(500).json({message: 'Password is incorrect'})
            }
        })
    })

export default router;