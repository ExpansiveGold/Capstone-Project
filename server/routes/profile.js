import express from 'express';
const router = express.Router()

// +--------------------+
// | User Profile Route |
// +--------------------+

//TODO: Integrate with database
router.route("/:id")
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

router.route("/:id/change_password")
    .post((req, res) => {

    })

router.route("/:id/delete_account")
    .delete((req, res) => {

    })

export default router;