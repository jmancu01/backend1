import { Observable, fromEvent, map } from 'rxjs';

function reversing(text){
    return text.split('').reverse().join('');
}

window.onload = function(){
    const input = document.getElementById('entrada')
    const output = document.getElementById('salida')

   

    const nuevoObservable = new Observable((observable) =>{

        input.addEventListener('input', (e) => {

            if(input = 'error'){
                observable.error('ingresaron un error')
            }
            if(input = 'completed'){
                observable.complete()
            }
            if(e.data === null){
                salida = output.value.substring(1)
            }
            else {
                salida = reverseString(output.value);
                salida += e.data;
                salida = reverseString(salida)
            }
    
        })
       
    })
}