import express from 'express';
const router = express.Router()

// +---------------+
// | Puzzels Route |
// +---------------+

// TODO: Integrate with database
// /puzzles
router.route("/") 
    .get((req, res) => {
        res.send('Puzzles')
    })

export default router;