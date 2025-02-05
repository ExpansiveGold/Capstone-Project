import express from 'express';
import mongoose from 'mongoose';
const uri = "mongodb+srv://gabrieltarumoto:oOe127axFb2SlQJv@chess-cluster.h4ww3.mongodb.net/Users?retryWrites=true&w=majority&appName=Chess-Cluster";

const app = express();
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