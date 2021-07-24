const express = require('express')
const fs = require('fs')
const app = express()
const port = 8080


let visitas1 = 0;
let visitas2 = 0;

//primer metodo
app.get('/items', async(req, res) => {
    //sumo visita
    visitas1++
    //leo el archivo
    let items =  fs.readFileSync('./products.txt', 'utf-8', (err, data) => {
        if(err) {
          console.log('error: ', err);
        } else {
         
          return data
        }
    })
    //cambio caracteres no aceptable en json
    items = items.replace(/\\n/g, "\\n")  
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    items = items.replace(/[\u0000-\u0019]+/g,""); 
    //parse, convierte json en objeto
    items= JSON.parse(items)
    //recorro items para tener su titulo
    let itemArr = []
    items.forEach(element => {
      itemArr.push(element.title)
    });
    //guardo largo porque despues lo paso a JSON y pierdo la informacion
    const largo = items.length
    items= JSON.stringify(items)
    itemArr = JSON.stringify(itemArr)

    res.send({ "item": itemArr, "cantidad": largo})
})
//metodo dos
app.get('/item-random', async(req, res) => {

  visitas2++
  let items =  fs.readFileSync('./products.txt', 'utf-8', (err, data) => {
      if(err) {
        console.log('error: ', err);
      } else {
       
        return data
      }
  })
  items = JSON.parse(items)
  const ranNumber = Math.floor(Math.random()*3)
  console.log(ranNumber)
  res.send({ "item": items[ranNumber]})
})
//visitas
app.get('/visitas', async(req, res) => {

  res.send({"visitas": {"metodo1": visitas1, "metodo2": visitas2 }})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.on('error', (err) => {
    console.log('ERROR =>', err);
});
  