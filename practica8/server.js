import express from 'express'
import  Products from './functions.js'
const app = express()
const port = 8080

app.get('/', (req, res) =>{
    
    res.send(' Probar rutas /api/productos/lista, para poder ver la lista de productos \n' + 
             ' /api/productos/lista/id para poder buscar un producto en particular \n' +
             ' /api/productos/guardar para guardar un producto en la lista')
})

app.get('/api/productos/lista', (req, res) =>{
    const products = new Products()
    const data = products.get()

    res.json(
        {
            data
        }
    )
})
app.get('/api/productos/lista/id', (req, res) =>{

    const id = req.query.id
    const products = new Products()
    const data = products.buscar(id)
    
    res.json(
        {
            data
        }
    )
})
app.get('/api/productos/guardar', (req, res) =>{
    
    const products = new Products(req.query.nombre, parseInt(req.query.precio))
    const data = products.guardar()

    res.json(
        {
            data
        }
    )
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.on('error', (err) => {
    console.log('ERROR =>', err);
});
  