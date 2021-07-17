import fs from 'fs'

let contador = 0

const master = (texto, splitter) => {
    
    return new Promise(function(resolve) {

        const text = fs.readFileSync(texto, 'utf8',  (err, data) => {

            console.log(data)
            if (err) throw err;
            else return data
        });
        const arr = text.split(splitter);
        arr.forEach(element => {
            for(var i = 0; i < element.length; i++){
                console.log(element[i])
            } 
            console.log('terminado')
            contador++
        });
        resolve()
    })
}

master('text.txt', ' ')
.then(master('text1.txt', ' '))
.then(master('text2.txt', ' '))
.finally(console.log('proceso terminado ', contador))