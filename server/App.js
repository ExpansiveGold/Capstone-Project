import express from 'express';
import dbconnect from './server.js'
const app = express();

// require("./routes/startup.js")
import startup from "./routes/startup.js"

startup(app)

// app.use(express.json()); 

// Connect to database
dbconnect()
// Starts server
app.listen(5000, () => console.log('Server started on port 5000'))

app.get('/users', (req, res) => {
    res.json({'users': ['user1', 'user2', 'user3']})
})
