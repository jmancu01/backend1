import { Router } from "express";
import cookieParser from 'cookie-parser';
import express from 'express'

const app = express()
app.use(cookieParser());

const router = Router();

router.get('/', (req, res) => {
    let { nombre, apellido, email } = req.query;
    console.log(nombre, valor, email);
    const tiempo = 6000;

    if (nombre && apellido && email) {
        
        res
            .cookie(nombre, valor, { maxAge: parseInt(tiempo) })
            .send({ proceso: 'ok' });
    } else {
        res.send({ error: 'set-cookie: falta nombre ó valor' });
    }
});

export default router