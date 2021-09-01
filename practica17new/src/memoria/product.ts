import { mySQLDB } from "../services/db";
export let contador = 3

class Productos {
  find(id: number){
    
  }

  get(id?: number) {
    
  }

  add(data: any) {
    const newItem = {
      nombre: data.nombre,
      precio: data.precio,
    };

    return mySQLDB('productos').insert(newItem);
  }

  update(id: number, data: any){
    return mySQLDB.from('productos').where({ id }).update(data);  
  }

  delete(id: number) {
    return mySQLDB.from('productos').where({ id }).del();
  }
}

export const adminProducts = new Productos();