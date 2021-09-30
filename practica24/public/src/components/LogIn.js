import '../App.css';
import axios from 'axios'
import { useState } from 'react';

function LogIn() {

    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [email, setEmail] = useState()

    const handleSubmit = () =>{

        const user = {
            nombre: nombre,
            apellido: apellido,
            email: email
        };
        console.log(user)

        axios.post(`http://localhost:8080/api/cookies`, { user })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    return (
    <div className="App">
         <h1 >Bienvenido</h1>
        <div id="name"></div>
        <h2 class='mt-4'>Centro de Mensajes</h2>
        <div className = 'forms'>
                    <label for="name"><b>Nombre</b></label>
                    <input type="text" placeholder="Ingrese su nombre" onChange = {e => setNombre(e.target.value)}/>
    
                    <label for="surname"><b>Apellido</b></label>
                    <input type="text" placeholder="Ingrese su apellido" onChange = {e => setApellido(e.target.value)}/>
    
                    <label for="email"><b>Correo Electronico</b></label>
                    <input type="text" placeholder="Ingrese su correo" onChange = {e => setEmail(e.target.value)}/>
        </div>
        <button type="submit" className="button" onClick = {handleSubmit} >       
                   Continuar al pago          
        </button>
        <div class='mt-4' id='mensajesContainer'>

        </div>
    </div>
  );
}

export default LogIn;