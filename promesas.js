import {separarPalabras, mostrarPalabras} from './functions.js'
import fs from 'fs'

export const getText = (texto) => {
    
    const text = 'x'

    return new Promise(function(resolve, reject) {

      if (text == 'x') {
        resolve(fs.readFileSync(texto, 'utf8',  (data) => {
            return data
        }));
      }
      else {
        reject();
      }
    })
}

const arr = []

getText('text.txt').then((resultado) =>{
    console.log(resultado);
    const r = separarPalabras(resultado, ' ')
    console.log(r)
    return r
  }).then((nuevoresultado) => {
    mostrarPalabras(nuevoresultado)
  }).catch(() => {
    console.log('Algo salió mal');
  })