import {getText, separarPalabras, mostrarPalabras} from './functions.js'

async function procesos(text, splitter){
    let texto = await getText(text)
    let arr = await separarPalabras(texto, splitter)
    mostrarPalabras(arr)
}

procesos('text.txt', ' ')