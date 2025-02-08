import express from 'express';
import mongoose from 'mongoose';
const uri = "mongodb+srv://gabrieltarumoto:oOe127axFb2SlQJv@chess-cluster.h4ww3.mongodb.net/Users?retryWrites=true&w=majority&appName=Chess-Cluster";
import User from './models/user.model.js';
const app = express();

app.use(express.json()); 

// connect to the database
mongoose.connect(uri)
.then(() => {
    console.log('Conected to the database!')
    // Starts server
    app.listen(5000, () => {
        console.log('Server started on port 5000') 
    });
})
.catch(() => {
    console.log('Conection failed')
})

app.get('/users', (req, res) => {
    res.json({'users': ['user1', 'user2', 'user3']})
})

app.post('/create_account', async (req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch {
        res.status(500).json({message: error.message})
    }
})