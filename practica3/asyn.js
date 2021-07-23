import {getText, separarPalabras, mostrarPalabras} from './functions.js'

const sleep = (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, ms);
    });
}

async function procesos(text, splitter){
    let texto = await getText(text)
    let arr = await separarPalabras(texto, splitter)
    await sleep(1000)
    mostrarPalabras(arr)
}

procesos('text.txt', ' ').then(procesos('text1.txt', ' '))
.then(procesos('text2.txt', ' '))
.finally(console.log('proceso terminado '))