import {Request, Response} from 'express'
import { adminProducts } from '../memoria/product'


class Product{
    constructor(){

    }
    // VER LA LISTA DE PRODUCTOS O UN ID PARTICULAR
    async getProduct(req: Request, res: Response){
        //se obtiene el id por prams
        const {id} = req.query
        
        if(id){
            
            const products = await adminProducts.get(id)  //busco si existe el product con ese id
         
            if(!products){ //si no existe le mando el error
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
          
            return res.json({ //si existe le mando el producto
                data: products
            })
        }else{
            const products = await adminProducts.get(id)
          
            return res.json({  //si no manda ahi le mando 
                data: products
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
            const products = await adminProducts.get(id) 
            //si no existe le mando el error
            if(!products){
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
            const data = {
                nombre: nombre,
                precio: precio
            }

            //si existe lo borro
            const update = await adminProducts.update(id, data)
            // const newList = await mySQLDB.from('productos').select();

            return res.json({
                msg: 'El producto fue modificado con exito',
                data: "newList",
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
            const products = await adminProducts.get(id) 
            // //si no existe le mando el error
            if(!products){
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
            //si existe lo borro
            const data = await adminProducts.delete(id)
            
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