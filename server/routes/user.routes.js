import express from 'express';
import db from '../server.js'
import ObjectId from 'mongodb';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
const router = express.Router()

const UserColl = db().collection("Users")

// +-----------------------+
// | Admin User CRUD Route |
// +-----------------------+

router.route("/") // /admin/users
    .get(async (req, res) => {
        var users = await UserColl.find({}).toArray((err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        console.log(users, typeof(users))
        res.status(200).send(users)
    })

router.route('/add')
    .post(async (req, res) => {
        // get info send by user
        const info = req.body
        // define salt rounds(how secure the encryption is)
        const saltRounds = 10
        // generate salt
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                res.status(500).json({message: err.message})
            }
            // Hash password
            bcrypt.hash(String(info.password), salt, async (err, hash) => {
                if (err) {
                    res.status(500).json({message: err.message})
                }
                
                // Create user object
                const NewUser = new User({
                    username: info.username,
                    email: info.email,
                    password: hash,
                    isAdmin: info.isAdmin,
                    isBanned: info.isBanned,
                    creationDate: Date()
                })
                // Insert user in database, catch for errors
                try {
                    const user = await UserColl.insertOne(NewUser);
                    res.status(200).json(user)
                } catch (error) {
                    res.status(500).json({message: error.message})
                }
            })
        })
    })

router.route('/edit/:id')
    .get(async (req, res) => {
        var query = { _id: new ObjectId(req.params['id']) }
        var user = await UserColl.findOne(query)
        res.status(200).send(user)
    })
    .post(async (req, res) => {
        var query = { _id: new ObjectId(req.params['id']) }
        var newData = { $set: req.body }
        var users = await UserColl.updateOne(query, newData, (err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        res.status(200).send(users)
    })

router.route('/delete/:id')
    .delete(async (req, res) => {
        var query = { _id: new ObjectId(req.params['id']) }
        var users = await UserColl.deleteOne(query, (err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        res.status(200).send(users)
    })

export default router;