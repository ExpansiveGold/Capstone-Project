import express from 'express';
import { ObjectId } from 'mongodb';
const router = express.Router()
import db from '../server.js'

const User = db().collection("Users")

// +-----------------------+
// | Admin User CRUD Route |
// +-----------------------+

// TODO: Integrate with database
router.route("/") // /admin/users
    .get(async (req, res) => {
        var users = await User.find({}).toArray((err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        console.log(users, typeof(users))
        res.send(users)
    })

router.route('/add')
    .post(async (req, res) => {
        try {
            const user = await User.insertOne(req.body);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

router.route('/edit/:id')
    .get(async (req, res) => {
        var query = { _id: new ObjectId(req.params['id']) }
        var user = await User.findOne(query)
        res.send(user)
    })
    .post(async (req, res) => {
        var query = { _id: new ObjectId(req.params['id']) }
        var newData = { $set: req.body }
        var users = await User.updateOne(query, newData, (err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        // console.log(users, typeof(users))
        res.send(users)
        // res.send('User edited')
    })

router.route('/delete/:id')
    .delete(async (req, res) => {
        var query = { _id: new ObjectId(req.params['id']) }
        var users = await User.deleteOne(query, (err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        res.send(users)
    })

export default router;