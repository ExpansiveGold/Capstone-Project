import express from 'express';
const router = express.Router()

// +-----------------------+
// | Admin User CRUD Route |
// +-----------------------+

// TODO: Integrate with database
router.route("/") // /admin/users
    .get((req, res) => {
        res.send('Get all users')
    })

router.route('/add')
    .post((req, res) => {
        res.send('Add user')
    })

router.route('/edit/:id')
    .get((req, res) => {
        res.send('Get user to edit')
    })
    .post((req, res) => {
        res.send('User edited')
    })

router.route('/delete/:id')
    .delete((req, res) => {
        res.send('User deleted')
    })

export default router;