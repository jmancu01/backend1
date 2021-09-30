const socket = io(); //llamo a sockets

const formMensaje = document.getElementById('formMensajes');
const mensajesContainer = document.getElementById('mensajesContainer'); //donde estan los mensajes

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

    socket.emit('newMessage', data);
    email.value = '';
    nombre.value = '';
    apellido.value = '';
    mensaje.value = '';
  }
});

socket.on('receiveMessages', (mensajes) => {
  console.log(mensajes)
  let p = document.createElement('p');
    for (const property in mensajes.entities.message) {
      console.log(property)
      p.innerHTML = `
      <span class='mx-2 mensaje__email'>${property}</span>
      <span class='mx-2 mensaje__text'>${property.author}</span>`
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
