import express from 'express';
const router = express.Router()

// +--------------------+
// | User History Route |
// +--------------------+

router.route("/:id/history") // /user/:id/history
    .get((req, res) => {
        res.send('User History')
    })

export default router;