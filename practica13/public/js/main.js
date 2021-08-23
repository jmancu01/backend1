
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get UserName and room from URL
const {userName, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})


const socket = io()

//join chatroom
socket.emit('joinRoom', {userName, room})

//get room and users
socket.on('roomUsers', ( room, users ) => {
    outputRoomName(room),
    outputUsers(users)
})

//message to server
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

    if (!msg) {
        return false;
    }
    //enviamos el msg al server
    socket.emit('chatMessage', msg)

    //limpiar la barra de input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

const sendMessage = (message) =>{
    const newMessage = document.createElement('div')
    newMessage.classList.add('message')
    newMessage.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(newMessage)
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room.room;
}
  // Add users to DOM
function outputUsers(users) {
  console.log(users)
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
}
  
  //Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } 
  else {
  }
});