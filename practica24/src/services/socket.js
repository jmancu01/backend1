import socketIo from 'socket.io';
import { getAllMessages, addMessage } from '../models/messages';

export const initWsServer = (server) => {
 
  const io = socketIo(server);  //llamo a socket
  
  io.on('connection', async (socket) => { //ejecuta cuando hay una conexion
    console.log('LLEGO CONNECTION');

    let msges = await getAllMessages(); //muestro todos los mensajes desde models/messages/index.js
    socket.emit('receiveMessages', msges);

    socket.on('newMessage', (msge) => { //si se llama a la funcion newMessage se ejecuta
      console.log('LLEGO MENSAJE');
      addMessage(msge);
      io.emit('newMessage', msge);
    });
  });

  return io;
};
