import express from 'express';
const router = express.Router()

// +--------------------+
// | User History Route |
// +--------------------+

router.route("/play") // /match/play
    .get((req, res) => {
        res.json({'users': ['user1', 'user2', 'user3']})
    })

router.route("/watch/:id") // /match/watch/:id
    .get((req, res) => {
        res.json({'users': ['user1', 'user2', 'user3']})
    })