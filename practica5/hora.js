import http from 'http'

function obtMensaje(){
    const hoy = new Date();
    const hours = hoy.getHours()
    
    let msg = 'buenos ddias'
    
    if(hours >= 13 && hours <= 20){
        msg = 'Buenas tardes'
    }
    else if(hours >= 20 && hours <= 13){
        msg = 'buenas noches'
    }
    
    return msg
}


const server = http.createServer((req, res) =>{
    const mensaje = obtMensaje()
    res.end(mensaje)
})

server.listen(8080, () => {
    console.log('escuchando tranqui')
})