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
    leer(){
        return productos
    }
    buscar(id){
        const products = this.get()
        const element = products.find( (value, index) => {
            const correlation = (value.id === id)
            if(correlation){
                return value
            }
        })
        return element
    }
}


