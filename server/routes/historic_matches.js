import express from 'express';
const router = express.Router()

// +-----------------------------+
// | User Historic matches Route |
// +-----------------------------+

// TODO: Integrate with database
// /historic_matches
router.route("/") 
    .get((req, res) => {
        res.send('History matches')
    })

export default router;