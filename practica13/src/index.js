import express from 'express'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'
import formatMessages from '../utils/messages'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
//set static folder
app.use(express.static(path.resolve(__dirname, '../public')))

//corre cuando se conecta un usuario
io.on('connection', (socket) => {
    console.log(`new connection from ${socket.client.id}`)
    
    //every body
    io.emit('message', formatMessages('juan', 'Join the chat'))
    //when disconect
    socket.on('disconnect', () =>{
        io.emit('message', formatMessages('juan', 'Left the chat'))
    })

    socket.on('chatMessage', (msg) =>{
        io.emit('message', formatMessages('juan', msg))
    })
})

const port = 8080 || process.env.port

server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`))
