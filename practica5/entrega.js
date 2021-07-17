import http from 'http'

function obtObjeto(){
    const randomNumber = Math.random()*10
    const randomPrice = Math.random()*1000
    
    const title = 'Producto ' + randomNumber
    const thumbnail = 'Foto ' + randomNumber
    
    return JSON.stringify({
        id: randomNumber,
        title: title,
        price: randomPrice,
        thumbnail: thumbnail,
    })
}


const server = http.createServer((req, res) =>{
    const mensaje = obtObjeto()
    res.end(mensaje)
})

server.listen(8080, () => {
    console.log('escuchando tranqui')
})