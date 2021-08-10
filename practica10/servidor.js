import express from 'express'
import path from 'path'
import handlebars from 'express-handlebars'
const app = express()
const port = 8080

const server = app.listen(port, ()=>
    console.log('escuchando en el puerto 8080')
)

const publicFolderPath = path.resolve('../public')
app.use(express.static(publicFolderPath))

const layoutFolderPath = path.resolve( '../practica10/views/layouts')
app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
    layoutsDir: layoutFolderPath,

}))

app.get('/', (req, res) => {

    const datosDinamicos = {
        nombre: 'Juan',
        apellido: 'Mancuso',
        listaProductos: ['camisa', 'pantalon', 'papel' ]
    }

    res.render('main', datosDinamicos)
})
