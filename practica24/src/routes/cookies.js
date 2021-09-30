import { Router } from "express";
import cookieParser from 'cookie-parser';
import express from 'express'

const app = express()
app.use(cookieParser());

const router = Router();

router.post('/', (req, res) => {
    let { nombre, apellido, email } = req.body.user;
    const tiempo = 6000;

    if (nombre && apellido && email) {
        res
            .cookie(nombre, apellido, { maxAge: parseInt(tiempo) })
            .send({ proceso: 'ok' });
    } else {
        res.send({ error: 'set-cookie: falta nombre ó valor' });
    }
});

app.get('/', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
});



export default router