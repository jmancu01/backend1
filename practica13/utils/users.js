const users = []

//Join user to chat

function userJoin(id, userName, room){
    const user = { id, userName, room}

    users.push(user)

    return user
}

//get currecnt user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}
//cuando un usuario deja el chat
function userLeaves(id){
    const index = users.findIndex(user => user.id === id)

}

//conseguir el numero de usarios
function getRoomUsers(room){
    
    return users.filter(user => user.room === room)
}

//export
module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers,
    userLeaves
}