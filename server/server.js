import mongoose from 'mongoose';
const uri = "mongodb+srv://gabrieltarumoto:oOe127axFb2SlQJv@chess-cluster.h4ww3.mongodb.net/API?retryWrites=true&w=majority&appName=Chess-Cluster";

// connect to the database
function dbconnect() {
    mongoose.connect(uri)
    .then(() => {
        console.log('Conected to the database!')
    })
    .catch(() => {
        console.log('Conection failed')
    })
}

export default dbconnect