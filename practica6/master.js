import fs from 'fs'

//crear una clase que pueda leer, agregar y borrar productos

class Products {
    
    constructor(texto) {
        this.texto = texto;
        this.info = []
    }
    

    get() {
        //leo y asigno data a items
        let items =  fs.readFileSync(this.texto, 'utf-8', (err, data) => {
            if(err) {
              console.log('error: ', err);
            } else {
            
              return data
            }
        })
        //parse items, devuelvo y asigno a items
        return this.info = JSON.parse(items)
       
    }

    set(item) {
        //consigo la data parseada
        const data = this.get()
        //covierto el item en un objeto
        let newItem = JSON.parse(JSON.stringify(item));
        data.push(newItem)
        
        //write data
        const dataStr = JSON.stringify(data)
        fs.writeFile(this.texto, dataStr, err => {
            if (err) {
            console.error(err)
            return
            }
            //file written successfully
        })
    }
    deleteLast(){
        const data = this.get()
       
        data.pop()
        
        //write data
        const dataStr = JSON.stringify(data)
        fs.writeFile(this.texto, dataStr, err => {
            if (err) {
            console.error(err)
            return
            }
            //file written successfully
        })
    }
    deleteOne(name){
        const data = this.get()
     
        const newData = data.filter( (item) => {
            return item.title !== name; 
        });
        const dataStr = JSON.stringify(newData)
        fs.writeFile(this.texto, dataStr, err => {
            if (err) {
            console.error(err)
            return
            }
            //file written successfully
        })
    }
}
class Item {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
}
const item = new Item ('parlante', '200', '4')
const products = new Products('../practica7/products.txt')

//metodos
products.get()
products.set(item)
products.deleteOne('Escuadra')
products.deleteLast()

