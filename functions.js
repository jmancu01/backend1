import fs from 'fs'

export const getText = (text) => fs.readFileSync(text, 'utf8',  (err, data) => {

    console.log(data)
    if (err) throw err;
    else return data
});

export const separarPalabras = (texto = 'Hola Boca de mi vida', spliter) =>{
    return texto.split(spliter); 
}

export function mostrarPalabras(arr){
    console.log(arr)
    arr.forEach(element => {
       for(var i = 0; i < element.length; i++){
           console.log(element[i])
       } 
       console.log('terminado')
    });
}