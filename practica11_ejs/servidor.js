import express from 'express'
import path from 'path'
import Products from '../practica8/functions.js'

const app = express()
const port = 8080

const server = app.listen(port, ()=>
    console.log('escuchando en el puerto 8080')
)

const publicFolderPath = path.resolve('../public')
app.use(express.static(publicFolderPath))

const viewsFolderPath = path.resolve( '../practica11_ejs/views')

app.set('view engine', 'ejs')
app.set('views', viewsFolderPath)

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true }));

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
app.post('/guardar', (req, res) =>{
    
    const products = new Products(req.body.nombre, parseInt(req.body.precio))
  
    const data = products.guardar()  

    res.redirect('/')
})
