import express from 'express';
import startup from "./routes/startup.routes.js"

// Start app
const app = express();
startup(app)

// Starts server
app.listen(5000, () => console.log('Server started on port 5000'))
