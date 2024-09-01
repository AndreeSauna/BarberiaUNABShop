// CRUD/src/routes/cart.routes.js
import { Router } from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller.js';
import { authRequired } from '../middlewares/valideToken.js';

const router = Router();

router.get('/cart', authRequired, getCart);
router.post('/cart', authRequired, addToCart);
router.delete('/cart/:productId', authRequired, removeFromCart);

export default router;
