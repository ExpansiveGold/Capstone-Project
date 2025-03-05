import express from 'express';
// import jwt from '../utils/jwtHelper.js'
import db from '../server.js';
import bcrypt from 'bcrypt';

const router = express.Router()

const UserColl = db().collection("Users")

router.route("/")
    .post(async (req, res) => {
        // get info send by user
        const { email, password } = req.body

        // Get user info
        var query = { email: email }
        var user = await UserColl.findOne(query)

        // User found
        if (!user) return res.status(400).json({message: 'Invalid username or password.'})
        
        // check password
        const validPass = bcrypt.compare(String(password), user.password)
        if (!validPass) return res.status(400).json({message: 'Invalid username or password.'})

        // const token = jwt.sign(user, process.env.SECRET_KEY);

        // res.status(200).send(token)
        res.status(200).send(user)
        
    })

export default router;