import fs from 'fs/promises'

const seAcabo = () => {
  console.log('-------Fin.-------');
}

const palabrasTotales = []

function recorrerTexto(texto, tiempo, funcion) {
  if (tiempo == null) {
    tiempo = 1000;
  }
  return new Promise((resolve, reject) => {
    fs.readFile(texto)
      .then(() => {
        return fs.readFile(texto);
      })
      .then(cuento => {
        const micuento = cuento.toString();
        const arrayCuento = micuento.split(' ');
        let i = 0;
        let tempo = setInterval(() => {
          if (i == arrayCuento.length) {
            funcion()
            clearInterval(tempo)
            resolve()
          } else {
            for (let index = 0; index < arrayCuento[i].length; index++) {
                console.log(arrayCuento[i].charAt(index))
            }
            console.log("palabra terminada")
            palabrasTotales.push(arrayCuento[i]),
            i++
          }
        }, tiempo);
      })
      .catch(err => {
        console.log('Ups!');
        console.log(err);
      });
  });
}
recorrerTexto('text.txt', 2000, seAcabo)
  .then(() => recorrerTexto('text1.txt', 3000, seAcabo))
  .then(() => recorrerTexto('text2.txt', 2500, seAcabo))
  .finally(() => {
    console.log('Proceso completo');
    console.log(`Usted imprimió un total de ${palabrasTotales.length} palabras`);
  });