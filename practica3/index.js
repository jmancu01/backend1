import {getText, separarPalabras, mostrarPalabras} from './functions.js'

const proceso = (texto = '', spliter) =>{
   
    const text = getText(texto)
    const array = separarPalabras(text, spliter)
    mostrarPalabras(array)
}
proceso('text.txt', ' ')