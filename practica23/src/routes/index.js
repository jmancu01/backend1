import { Router } from "express";
import cookiesRouter from './cookies.js'

const router = Router();

router.use('/cookies', cookiesRouter)

export default router;


