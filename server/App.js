import express from 'express';
import startup from "./routes/startup.routes.js"
import cors from 'cors'
import { createServer } from 'node:http'
import { config } from 'dotenv';
import { Server } from 'socket.io'
import session from "express-session";

// Start app
const app = express();
app.use(express.json());
app.use(cors());
config()

const server = createServer(app)

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from this origin and my frontend port = 3000
    //   methods: ["GET", "POST"], // Allow these HTTP methods
    },
});

// const sessionMiddleware = session({
//     secret: "changeit",
//     resave: true,
//     saveUninitialized: true,
// });
  
// app.use(sessionMiddleware);
// io.engine.use(sessionMiddleware);

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     // if (!token) {
//     //   return next(new Error("invalid username"));
//     // }
//     socket.token = token;
//     next();
// });

io.on("connection", (socket) => {
    // console.log("User connected ", socket.request.session.id); // Log the socket ID of the connected user
    console.log("User connected ", socket.id);

    socket.on('disconnect', (reason) => {
        console.log("User disconnected ", socket.id);
        console.log(reason)
    })

    socket.on('game_invite', (data) => {
        console.log('Game Invite', data)
        socket.timeout(5000).broadcast.emit('receive_invite', data, (err) => {
            if (err) {
                console.log(err)
                socket.emit('invite_refuse')
            }
        })
    })

    socket.on('accept', (data) => {
        console.log(`player2 joined room ${data.user.id}${data.friend.id}`)
        socket.join(`${data.user.id}${data.friend.id}`)

        socket.broadcast.emit('invite_accept', data)
    })

    socket.on('accepted', (data) => {
        console.log(`player1 joined room ${data.user.id}${data.friend.id}`)
        socket.join(`${data.user.id}${data.friend.id}`)
    })

    socket.on('refuse', () => {
        console.log('invite refused')
        socket.emit('invite_refuse')
    })

    socket.on('join_game', (data) => {
        socket.join(data.room)
    })

    socket.on('move', (data) => {
        console.log('moveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
        // console.log(socket.rooms)
        // socket.join(data.room)
        socket.to(data.room).emit('move_recieve', data)
        // socket.emit('move_recieve', data)
    })

    socket.on('giveup', (data) => {
        socket.to(data.room).emit('giveup_win')
    })
});

startup(app)
// Starts server
server.listen(5000, () => console.log('Server started on port 5000'))

// io.close()