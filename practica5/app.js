const productos = [
    { id: 1, nombre: 'Escuadra', precio: 323.5 },
    { id: 2, nombre: 'Calculadora', precio: 234.1 },
    { id: 3, nombre: 'Globo Terraqueo', precio: 18.5 },
    { id: 4, nombre: 'Paleta Pintura', precio: 56.8 },
    { id: 5, nombre: 'Reloj', precio: 200 },
  ];
let nombres = ''
productos.forEach(element => {
    nombres = nombres + (element.nombre + ',')
   
});
console.log(nombres)

function preciototal(){
    let precioTotal = 0

    productos.forEach(element => {
        precioTotal = precioTotal + element.precio
       
    });
    return precioTotal
}
console.log(preciototal())

function precioPromedio(){
    let i = 0
    const precioTotal = preciototal()
    productos.forEach(element => {
       i++
    });
    return precioTotal/i

}
console.log(precioPromedio())

function menorPrecio(){

    let menorPrecio = 3013091
    let producto = ''

    productos.forEach(element => {
        if(element.precio < menorPrecio){
            menorPrecio = element.precio
            producto = element.nombre
        }

    }
   
    )
    return producto
}

function mayorPrecio(){

    let mayorPrecio = 0
    let producto = ''

    productos.forEach(element => {
        if(element.precio > menorPrecio){
            mayorPrecio = element.precio
            producto = element.nombre
        }

    }
   
    )
    return producto
}

console.log(menorPrecio())
console.log(mayorPrecio())

const obj = {menorprecio: menorPrecio(), mayorprecio: mayorPrecio()}