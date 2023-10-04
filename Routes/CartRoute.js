import express from 'express'
import { 
    deleteCart, 
    getCartById, 
    createCart
} from '../Controllers/CartController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerCart = express.Router()
routerCart.post('/create/:idBook', verifyjson, createCart)
routerCart.delete('/delete/:idCart', verifyjson, deleteCart)
routerCart.get('/:idCart', getCartById)
export default routerCart;