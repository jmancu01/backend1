import { Router } from "express";
import cookieParser from 'cookie-parser';
import express from 'express'

const app = express()
app.use(cookieParser());

const router = Router();

router.get('/', (req, res) => {
    let { nombre, apellido, email } = req.query;
    console.log(req.query); 
    const tiempo = 6000;

    if (nombre && apellido && email) {
        res
            .cookie(nombre, apellido, { maxAge: parseInt(tiempo) })
            .send({ proceso: 'ok' });
        return res.redirect("/")
    } else {
        res.send({ error: 'set-cookie: falta nombre ó valor' });
    }
});


export default router