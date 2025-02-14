import express from 'express';
const router = express.Router()

// +--------------------+
// | User History Route |
// +--------------------+

router.route("/play") // /match/play
    .get((req, res) => {
        res.send('Play match')
    })

router.route("/watch/:id") // /match/watch/:id
    .get((req, res) => {
        res.send('Watch match')
    })

export default router;