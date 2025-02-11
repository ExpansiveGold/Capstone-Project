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
    
// /admin/historic_matches
router.route("/") 
    .get((req, res) => {
        res.send('Get all historic matches')
    })

router.route('/add')
    .post((req, res) => {
        res.send('Match added')
    })

router.route('/edit/:id')
    .get((req, res) => {
        res.send('Get match to edit')
    })
    .post((req, res) => {
        res.send('Match edited')
    })

router.route('/delete/:id')
    .delete((req, res) => {
        res.send('match deleted')
    })