import {Request, Response} from 'express'
import { adminProducts } from '../memoria/product'

let cartItems: any[] = []


class Cart{

    // VER LA LISTA DE PRODUCTOS O UN ID PARTICULAR
    getItems(req: Request, res: Response){
        //se obtiene el id por prams
        return res.json({
            data: cartItems
        })
    }

    deleteProduct(req: Request, res: Response){

        const {id} = req.query
        
        if(id){
            //busco si existe el product con ese id
            const product = cartItems.find(oneProduct => oneProduct.id === Number(id))
            //si no existe le mando el error
            if(!product){
                return res.status(404).json({
                    msg: 'Producto no encontrado'
                })
            }
            //si existe lo borro
            cartItems = cartItems.filter(oneProduct => oneProduct.id !== Number(id))
            return res.json({
                
                data: cartItems
            })
        }else{
            //si no manda ahi le mando 
            return res.json({
                msg: 'ingrese el id del item que desea eliminar'
            })
        }
    }
    
}

export const cartController = new Cart()