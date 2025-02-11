import express from 'express';
const router = express.Router()

// +-----------------------+
// | Admin User CRUD Route |
// +-----------------------+

// TODO: Integrate with database
router.route("/") // /admin/users
    .get((req, res) => {
        res.json({'users': ['user1', 'user2', 'user3']})
    })

router.route('/add')
    .post((req, res) => {

    })

router.route('/edit/:id')
    .get((req, res) => {
        res.json({
                'user': { 
                    id: 1 , 
                    data: ['user1', 'user2', 'user3']
                }
            })
    })
    .post((req, res) => {

    })

router.route('/delete/:id')
    .delete((req, res) => {

    })

export default router;