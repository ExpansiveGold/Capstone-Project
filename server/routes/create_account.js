import express from 'express';
// import User from '../models/user.model.js';
const router = express.Router()
import db from '../server.js'

const User = db().collection("Users")

router.route("/")
    .post(async (req, res) => {
        try {
            const user = await User.insertOne(req.body);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

export default router;