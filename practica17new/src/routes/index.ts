import { Router } from "express";
import productRouter from './products'
import cartRouter from './cart'

const router = Router()

router.use('/products', productRouter)

router.use('/cart', cartRouter)

export default router