import { Router} from "express";
import { cartController } from "../controllers/cart";
import { isUser } from "../middleware/user";

const router = Router();

router.get('/', cartController.getItems)

router.post('/:id', isUser, cartController.addProduct)

router.delete('/', isUser, cartController.deleteProduct)

export default router
