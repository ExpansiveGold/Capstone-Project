import express from 'express';
const router = express.Router()

// +--------------------+
// | User Friends Route |
// +--------------------+

//TODO: Integrate with database
// /user/:id/friends
router.route("/:id/friends")
    .get((req, res) => {
        const user = req.params['id']

        //TODO: Fetch data from database
        if (user == 1) {
            res.json({'friends': ['user1', 'user2', 'ROSEBAS']})
        }
        else {
            res.json({'friends': ['user1', 'user2', 'GANSO']})
        }
    })

router.route("/:id/friends/add/:friendID")
    .post((req, res) => {
        res.send('Friend added')
    })

router.route("/:id/friends/remove/:friendID")
    .delete((req, res) => {
        res.send('Friend removed')
    })

export default router;