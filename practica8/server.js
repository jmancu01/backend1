import express from 'express'
import  Products from './functions.js'
const app = express()
const port = 8080

//ruta de bienvenida
app.get('/', (req, res) =>{
    
    res.send(' Probar rutas /api/productos/lista, para poder ver la lista de productos \n' + 
             ' /api/productos/lista/id para poder buscar un producto en particular \n' +
             ' /api/productos/guardar para guardar un producto en la lista')
})

//poder visualizar las listas disponibles
app.get('/api/productos/lista', (req, res) =>{
    const products = new Products()
    const data = products.get()

    res.json(
        {
            data
        }
    )
})

//rastrear el producto indicado
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

//guardar un producto
app.post('/api/productos/guardar', (req, res) =>{
    
    const products = new Products(req.query.nombre, parseInt(req.query.precio))
    const data = products.guardar()

    res.json(
        {
            data
        }
    )
})

app.delete('/api/productos/borrar', (req, res) =>{
    
    const products = new Products()
    const data = products.borrar(parseInt(req.query.id))

    res.json(
        {
            data
        }
    )
})

app.put('/api/productos/actualizar', (req, res) =>{
    
    const products = new Products()
    const data = products.actualizar(parseInt(req.query.id), parseInt(req.query.precio), req.query.nombre)

    res.json(
        {
            data
        }
    )
})

//escuchando en el puerto
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
//console del error
app.on('error', (err) => {
    console.log('ERROR =>', err);
});
  