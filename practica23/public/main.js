import { denormalize } from "normalizr";
import { msge } from "../src/models/messages";

const socket = io(); //llamo a sockets

const formMensaje = document.getElementById('formMensajes');
const mensajesContainer = document.getElementById('mensajesContainer'); 
const name = document.getElementById('name');//donde estan los mensajes

let date = new Date();  
let now = date.toLocaleString();

formMensaje.addEventListener('submit', (event) => { //evento submit

  event.preventDefault();
  
  if (email.value && mensaje.value) { //si existe un valor email y mesaje
    let data = {
      author: {
        email: email.value,
        nombre: nombre.value,
        apellido: apellido.value,
      },
      text: mensaje.value,
    };
    let p = document.createElement('p');
    p.innerHTML = `<span class='mx-2 mensaje__time'>${mensaje.author.nombre}</span>`
    mensajesContainer.appendChild(p);

    socket.emit('newMessage', data);
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    mensaje.value = '';
  }
});

socket.on('receiveMessages', (mensajes) => {
  console.log(mensajes)
  const denormalizeData = denormalize(
    mensajes.result,
    msge,
    mensajes.result
  )
  console.log(denormalizeData)

  let p = document.createElement('p');
    for (const property in mensajes.entities.message) {
      p.innerHTML = `
      <span class='mx-2 mensaje__email'>${property}</span>`
    }
    ;
  mensajesContainer.appendChild(p);
});

socket.on('newMessage', (mensaje) => {
  let p = document.createElement('p');
  p.innerHTML = `
        <span class='mx-2 mensaje__email'>${mensaje.author.email}</span>
        <span class='mx-2 mensaje__time'>${mensaje.author.nombre}</span>
        <span class='mx-2 mensaje__text'>${mensaje.text}</span>`;
  mensajesContainer.appendChild(p);
});
