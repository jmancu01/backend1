import express from 'express';
import path from 'path';
//http
import * as http from 'http';
//importamos socket
import io from 'socket.io';
import Products from '../../practica12/public/functions.js';

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;


const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//motor de plantillas pug
app.set('view engine', 'pug');
const viewsPath = path.resolve('../practica12/views');
app.set('views', viewsPath);

//creamos un server http para nuestro express
const myServer = http.Server(app);

//escuchamos en el puerto decignado
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

//render del index
app.get('/', (req, res) => {
  
  const products = new Products()
  const arrayProductos = products.get()

  const datosDinamicos = {
    nombre: 'Juan',
    apellido: 'Mancuso',
    arrayProductos: arrayProductos,
  } 
  res.render('main', datosDinamicos);
});

app.post('/guardar', (req, res) =>{
    
  const products = new Products(req.body.nombre, parseInt(req.body.precio))
  console.log(products)
  const data = products.guardar()

  res.redirect('/')
})

//websocket
const myWSServer = io(myServer);

const messages = [];

//cuando se prende el server
myWSServer.on('connection', function (socket) {
  //se llama a funcion nuevo mensaje
  socket.on('new-message', function (data) {
    const newMessage = {
      socketId: socket.client.id,
      message: data,
    };
    console.log(newMessage);
    messages.push(newMessage);

    //PARA RESPONDERLE A UN SOLO CLIENTE
    // socket.emit('messages', messages);

    //PARA ENVIARLE EL MENSAJE A TODOS
    myWSServer.emit('messages', messages);

    //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
    // socket.broadcast.emit('messages', messages);
  });

  socket.on('askData', (data) => {
    console.log('ME LLEGO DATA');
    socket.emit('messages', messages);
  });
});