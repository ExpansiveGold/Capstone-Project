import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://gabrieltarumoto:oOe127axFb2SlQJv@chess-cluster.h4ww3.mongodb.net/API?retryWrites=true&w=majority&appName=Chess-Cluster";

// connect to the database
function db() {
    const client = new MongoClient(uri)
    const db = client.db("WebChess")
    return db
}

export default db