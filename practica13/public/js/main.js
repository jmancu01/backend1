

const socket = io()

const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')

socket.on('message', (message)=>{
    sendMessage(message)

    //scrolldown
    chatMessage.scrollTop = chatMessage.scrollHeight
})

// message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //taget al input
    const msg = e.target.elements.msg.value

    //enviamos el msg al server
    socket.emit('chatMessage', msg)

    //limpiar la barra de input
    e.target.elements.msg.focus()
})

const sendMessage = (message) =>{
    const newMessage = document.createElement('div')
    newMessage.classList.add('message')
    newMessage.innerHTML = `<p class="meta">${message.name} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(newMessage)
}