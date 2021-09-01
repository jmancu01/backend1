import express from 'express'
import path from 'path'
import * as http from 'http'
import apiRouter from '../routes/index'

//llamo a express
const app = express()

//seteo la public folder como la principal (cuando llame a la ruta y busque un archivo va a ser apartir de esta [localhost:8080/hola.txt] = public/hola.txt)
const publicFolderPath = path.resolve(__dirname, '../../public')
app.use(express.static(publicFolderPath))
//es importante para poder pasar parametros por body
app.use(express.json())
//difino la ruta de inicio
app.use('/api', apiRouter)



export const myServer = new http.Server(app)