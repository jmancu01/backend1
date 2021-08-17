"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var http = _interopRequireWildcard(require("http"));

var _socket = require("socket.io");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http
//importamos socket

/** INICIALIZACION API con EXPRESS */
const app = (0, _express.default)();
const puerto = 8080; //motor de plantillas pug

app.set('view engine', 'pug');

const viewsPath = _path.default.resolve('../views');

app.set('views', viewsPath); //creamos un server http para nuestro express

const myServer = http.Server(app); //escuchamos en el puerto decignado

myServer.listen(puerto, () => console.log('Server up en puerto', puerto)); //render del index

app.get('/', (req, res) => {
  res.render('main');
}); //

app.get('/hola', (req, res) => {
  res.json({
    msg: 'hola'
  });
}); //websocket

const myWSServer = new _socket.Server(myServer);
const messages = [];
myWSServer.on('connection', function (socket) {
  console.log('\n\nUn cliente se ha conectado');
  console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
  console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);
  socket.on('new-message', function (data) {
    const newMessage = {
      socketId: socket.client.id,
      message: data
    };
    console.log(newMessage);
    messages.push(newMessage); //PARA RESPONDERLE A UN SOLO CLIENTE
    // socket.emit('messages', messages);
    //PARA ENVIARLE EL MENSAJE A TODOS

    myWSServer.emit('messages', messages); //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
    // socket.broadcast.emit('messages', messages);
  });
  socket.on('askData', data => {
    console.log('ME LLEGO DATA');
    socket.emit('messages', messages);
  });
});