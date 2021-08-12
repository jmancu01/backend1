import express from 'express'
import path from 'path'
import handlebars from 'express-handlebars'
import Products from '../practica8/functions.js'

const app = express()
const port = 8080

const server = app.listen(port, ()=>
    console.log('escuchando en el puerto 8080')
)

const publicFolderPath = path.resolve('../public')
app.use(express.static(publicFolderPath))

const layoutFolderPath = path.resolve( '../practica10/views')
const partialFolderPath = path.resolve( './views/listas')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath
}))

app.get('/', (req, res) => {
    const products = new Products()
    const arrayProductos = products.get()

    const datosDinamicos = {
        nombre: 'Juan',
        apellido: 'Mancuso',
        arrayProductos: arrayProductos,
    }

    res.render('main', datosDinamicos)
})
app.get('/guardar', (req, res) =>{
    
    const products = new Products(req.query.nombre, parseInt(req.query.precio))
    console.log(products)
    const data = products.guardar()

    res.json(
        {
            data
        }
    )
})
