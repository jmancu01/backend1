const { Observable, fromEvent, map } = rxjs;

function reverseString(str) {
    //se separa el string en letras. se da vuelta y se vuelve a juntar
  return str.split("").reverse().join("");
}

window.onload = function () {

    //marcamos los inputs para manipularlos
  const input = document.getElementById('entrada');
  const output = document.getElementById('salida');


  const miCustomObservable = new Observable((observable) => {

    //variable a la que asignamos un valor para hacer el return
    let salida;

    input.addEventListener('input', (e) => {
      console.log(e)
      //error si pone error
      if (input.value == 'error')
        observable.error('Ingresaron Error');
      //complete si pone complete
      if (input.value == 'complete')
        observable.complete()

      //en caso de borrar
      if (e.data == null) {
        salida = output.value.substring(1)
      }

      //en caso que escriba cualquier cosa
      else {
        //asignamos el miror a salida
        salida = reverseString(output.value);
        //sumamos el valor del evento a salida
        salida += e.data;
        //volvemos a dar vuelta el valor de salida para que nos tome el ultimo valor
        salida = reverseString(salida)
      }
      //next funciona como un return. los observables pueden devolver varios valores
      observable.next(salida)
    })
  })

  //el input debajo cambia su valor a la data que llega del observable.next
  const miFuncionNext = (data) => {
    output.value = data;
  }

  //ambos input cambia su valor a 0 y se desabilitan. cuando se hace un unsubscribe, el observable deja de escuchar(se termina)
  const miFuncionComplete = () => {
    console.log(`COMPLETE`);
    input.disabled = true;
    input.value = '';
    output.value = '';
    sub.unsubscribe();
  }
  //ambos input cambia su valor a 0 y se desabilitan. se muestra el error en consola
  const miFuncionError = (msg) => {
    console.log(`ERROR ===> ${msg}`);
    input.disabled = true;
    input.value = '';
    output.value = '';
    sub.unsubscribe();
  }
  //el handler dicta que funcion los pasos a seguir dependiendo la respuesta, en este caso agarra el valor y se lo da una funcion
  const handler = {
    next: miFuncionNext,
    error: miFuncionError,
    complete: miFuncionComplete,
  }

  //una vez que esta subscrito, el observable empieza a escuchar. Hasta que se llame a unsubscribe
  const sub = miCustomObservable.subscribe(handler)

  //pasado los 30seg se llama a unsubscribe
  setTimeout(() => {
    console.log("YA me canse de escuchar");
    sub.unsubscribe();
  }, 30000)

}