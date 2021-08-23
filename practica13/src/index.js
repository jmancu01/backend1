import express from 'express'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'
import formatMessages from '../utils/messages'
import 
    { userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUsers }
from '../utils/users'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
//set static folder
app.use(express.static(path.resolve(__dirname, '../public')))

//corre cuando se conecta un usuario
io.on('connection', (socket) => {

    socket.on('joinRoom', ({userName, room}) =>{
        const user = userJoin(socket.id, userName, room)
        socket.join(user.room)
    
    
        //to the room
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessages('ChatBot', `${user.userName} has join the chat`)) //emite a msg that the user join
            //change the number of peorple in the room
            io.to(user.room).emit(
                'roomUsers', {
                    room: user.room,
                    users: getRoomUsers()
                }
            )
        //when disconect
        socket.on('disconnect', () =>{
            const user = userLeaves(socket.id)

            if(user){
                //emite a chatbot msg when smone leave
                io.to(user.room).emit('message', formatMessages('ChatBot', `${user.userName} has left the chat`))
                //change side bar info when a user left
                io.to(user.room).emit(
                    'roomUsers', {
                        room: user.room,
                        users: getRoomUsers(user.room)
                    }
                )
            }
        })

        socket.on('chatMessage', (msg) =>{
            io.emit('message', formatMessages(userName, msg))
        })
    })
})

const port = 8080 || process.env.port

server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`))
