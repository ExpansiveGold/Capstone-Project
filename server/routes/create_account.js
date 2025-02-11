import express from 'express';
const router = express.Router()

import User from '../models/user.model.js';

router.route("/")
    .post(async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

export default router;