import fs from 'fs'


//crear una clase que pueda leer, agregar y borrar productos
export default class Products {
    
   

    constructor(nombre, precio) {
        this.id = Math.floor(Math.random() * 10000)
        this.nombre = nombre;
        this.precio = precio
    }
    
    get(){
        
        let items =  fs.readFileSync('./products.txt', 'utf-8', (err, data) => {
            if(err) {
              console.log('error: ', err);
            } else {
             
              return data
            }
        })
        return JSON.parse(items)
    }

    guardar(){
        const productostxt = this.get()
        if(typeof this.nombre === 'string' && typeof this.precio === 'number'){
            productostxt.push({"id": this.id, "nombre": this.nombre, "precio": this.precio})
            const productosstr = JSON.stringify(productostxt)
            fs.writeFile('./products.txt', productosstr, err => {
                if (err) {
                console.error(err)
                return
                }
                //file written successfully
            })
            return ('El producto fue agregado con exito')
        }else{
            return('No podemos agregar este producto, por favor revise la documentacion')
        }
        
    }
    //buscar por id
    buscar(id){
        //conseguir la lista
        const products = this.get()
        //buscar el product que coincida el valor de id con el buscado
        const element = products.find( (value, index) => {
            const correlation = (value.id === id)
            if(correlation){
                return value
            }
        })
        return element
    }

    actualizar(id, newPrecio, newNombre){
        const products = this.get()
        
        if(typeof newNombre === 'string' && typeof newPrecio === 'number'){
            if(this.buscar(id) === undefined){
                console.log(`El producto con id: ${id} no existe en la lista`)
            }else{
            products.map((element)=>{

                if(element.id === id){
                    element.nombre = newNombre
                    element.precio = newPrecio
                }
            })
            const productsstr = JSON.stringify(products)
            fs.writeFile('./products.txt', productsstr, err => {
                if (err) {
                console.error(err)
                return
                }
                //file written successfully
            })
            return ('El producto fue modificado con exito')
            }
        }else{
            return('No podemos modificar este producto, por favor revise la documentacion')
        }
    }

    borrar(id){

        let products = this.get()

        if(this.buscar(id) === undefined){
            console.log(`El producto con id: ${id} no existe en la lista`)
        }else{
        products = products.filter((element)=>{
            return element.id !== id; 
        })
        const productsstr = JSON.stringify(products)
        fs.writeFile('./products.txt', productsstr, err => {
            if (err) {
            console.error(err)
            return
            }
            //file written successfully
        })
        return ('El producto fue borrado con exito')
        }
    }
}

