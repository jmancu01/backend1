

const socket = io.connect('http://localhost:8080', { forceNew: true });

//al apretar el boton se llama a la funcion sendData
function sendProducts(e) {
  //localiza el input con el valor ingresado
  const nombre = document.getElementById('nombre');
  //localiza el input con el valor ingresado
  const precio = document.getElementById('precio');

  const obj = { nombre: nombre.value, precio: precio.value}
  //emite un socket con ese valor
  socket.emit('new-product', obj);
}


function render1(data) {
  console.log(data);
  var html = data
    .map(function (elem, index) {
      return `<ul>
            <li>${elem.id}</li>
        </ul>
        <ul>
            <li>${elem.nombre}</li>
        </ul>
        <ul>
          <li>${elem.precio}</li>
        </ul>`
    })
    .join(' ');

  document.getElementById('products').innerHTML = html;
}

socket.on('products', function (data) {
  console.log('RECIBI MENSAJE');
  render1(data);
});