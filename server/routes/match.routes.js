import express from 'express';
import db from '../server.js'
import Match from '../models/matches.model.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
const router = express.Router()

const MatchesColl = db().collection("Matches")

// +-------------+
// | Match Route |
// +-------------+

router.route("/play") // /match/play
    .post((req, res) => {
        // get info send by user
        const info = req.body
        // res.send('Play match')

        let moves = ''

        for(let i = 0; i < info.moves.lenght; i++){
            moves += info.moves[i].board + info.moves[i].move
        }
        
        // define salt rounds(how secure the encryption is)
        const saltRounds = 10
        // generate salt
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                res.status(500).json({message: err.message})
            }

            const date = String(Date())

            const data = 
                info.white + 
                info.black +
                moves +
                info.movesPgn +
                info.result +
                date +
                info.duration +
                info.place +
                info.tournament
                
            // Hash Match
            bcrypt.hash(data, salt, async (err, hash) => {
                if (err) {
                    res.status(500).json({message: err.message})
                }

                const match = {
                    white: new ObjectId(String(info.white)),
                    black: new ObjectId(String(info.black)),
                    moves: info.moves,
                    movesPgn: info.movesPgn,
                    result: info.result,
                    creationDate: Date(),
                    duration: info.duration,
                    place: info.place,
                    tournament: info.tournament,
                    hash: hash
                }

                console.log(match)
                
                // Create match object
                const NewMatch = new Match(match)
                // Insert match in database, catch for errors
                try {
                    const match = await MatchesColl.insertOne(NewMatch);
                    res.status(200).json(match)
                } catch (error) {
                    res.status(500).json({message: error.message})
                }
            })
        })
    })

router.route("/watch/:hash") // /match/watch/:id
    .get(async (req, res) => {
        var query = { hash: req.params['hash'] }
        var match = await MatchesColl.findOne(query, (err, res) => {
            if (err) throw err;
            console.log(res)
            db.close()
        })
        res.status(200).send(match)
    })

export default router;