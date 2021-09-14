import {producto} from '../models/productos'
export let contador = 3

class Productos {
 
  async get(id: any) {
    let res = {}
    if(id){
      res = await producto.find({_id: id})
    }else{
      res = await producto.find({})
    }
    return res
  }

  async add(data: any) {
    const newItem = {
      nombre: data.nombre,
      precio: data.precio,
    };
    const usuarioModel = new producto(newItem)
    const res = await usuarioModel.save()
    
    return res
  }

  async update(id: any, data: any){
    const res = await producto.updateOne({_id: id}, { $set: { nombre: data.nombre, precio: data.precio } })

    return res
  }

  async delete(id: any) {
    const res = await producto.deleteOne({_id: id})
    
    return res
  }
}

export const adminProducts = new Productos();