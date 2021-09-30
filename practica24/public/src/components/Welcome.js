import '../App.css';
import axios from 'axios'
import { useState, useEffect } from 'react';

function LogIn() {

    const [nombre, setNombre] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cookies`)
        .then(res => {
            console.log(res);
            setNombre(res.nombre)
        })
    }, []);

        


    return (
    <div className="App">
         <h1>Bienvenido {nombre}</h1>
    </div>
  );
}

export default LogIn;