import express from 'express';
import dbconnect from './server.js'
import startup from "./routes/startup.js"

// Connect to database
dbconnect()

// Start app
const app = express();
startup(app)

// Starts server
app.listen(5000, () => console.log('Server started on port 5000'))
