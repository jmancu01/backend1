import { Router, Request, Response } from "express";
import { productController } from "../controllers/product";
import { isAdmin } from "../middleware/admin";

const router = Router();

router.get('/', productController.getProduct)

router.post('/', isAdmin, productController.addProduct)

router.put('/:id', isAdmin,  productController.updateProduct)

router.delete('/', isAdmin, productController.deleteProduct)

export default router