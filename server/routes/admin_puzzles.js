import express from 'express';
const router = express.Router()

// +---------------+
// | Puzzels Route |
// +---------------+

// TODO: Integrate with database
// /admin/puzzles
router.route("/") 
    .get((req, res) => {
        res.send('Get all puzzles')
    })

router.route('/add')
    .post((req, res) => {
        res.send('Puzzle added')
    })

router.route('/edit/:id')
    .get((req, res) => {
        res.send('Get puzzle to edit')
    })
    .post((req, res) => {
        res.send('Puzzle edited')
    })

router.route('/delete/:id')
    .delete((req, res) => {
        res.send('Puzzle deleted')
    })

export default router;