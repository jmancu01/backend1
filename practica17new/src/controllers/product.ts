import {Request, Response} from 'express'
import { adminProducts, contador } from '../memoria/product'
import { mySQLDB} from '../services/db'

class Product{
    constructor(){

    }
    // VER LA LISTA DE PRODUCTOS O UN ID PARTICULAR
    async getProduct(req: Request, res: Response){
        //se obtiene el id por prams
        const {id} = req.query
        
        if(id){
            //busco si existe el product con ese id
            const product = await mySQLDB.from('productos').where({ id: id }).select();
            //si no existe le mando el error
            if(!product){
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
            //si existe le mando el producto
            return res.json({
                data: product
            })
        }else{
            const data = await mySQLDB.from('productos').select();
            //si no manda ahi le mando 
            return res.json({
                data: data
            })
        }
    }

    // AGREGAR UN PRODUCTO
    async addProduct(req: Request, res: Response){
        //que nos pasen el nombre y precio por body
        const {nombre, precio} = req.body
        //por si no pasa precio nombre o no cumplen con sus tipos
        if(!precio || !nombre || typeof nombre !== 'string' || isNaN(precio)){
            res.status(400).json(
                {
                    msg: 'lee la docu pibe'
                }
            )
        }
        const newItem = {
            nombre: nombre,
            precio: Number(precio)
        }

        const data = await adminProducts.add(newItem)

        res.json({
            msg: 'Producto fue agregado',
            data: data
        })
    }

    async updateProduct(req: Request, res: Response){
        const {id} = req.params
        const {nombre, precio} = req.body

        if(id){
            //busco si existe el product con ese id
            const product = await mySQLDB.from('productos').select();

            //si no existe le mando el error
            if(!product){
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
            const data = {
                nombre: nombre,
                precio: precio
            }

            //si existe lo borro
            const update = await adminProducts.update(Number(id), data)
            const newList = await mySQLDB.from('productos').select();

            return res.json({
                msg: 'El producto fue modificado con exito',
                data: newList,
                update: update
            })
        }else{
            //si no manda ahi le mando 
            return res.json({
                msg: 'ingrese el id que desea eliminar'
            })
        }
        
    }
    async deleteProduct(req: Request, res: Response){

        const {id} = req.query
        
        if(id){
            //busco si existe el product con ese id
            const product = await mySQLDB.from('productos').select();
            //si no existe le mando el error
            if(!product){
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
            //si existe lo borro
            const data = await adminProducts.delete(Number(id))
            return res.json({
                data: data
            })
        }else{
            //si no manda ahi le mando 
            return res.json({
                msg: 'ingrese el id que desea eliminar'
            })
        }
    }
    
}

export const productController = new Product()