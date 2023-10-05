import express from 'express'
import { 
    deleteCart, 
    getCartById, 
    createCart,
    getCarts
} from '../Controllers/CartController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerCart = express.Router()
routerCart.post('/create/:idBook', verifyjson, createCart)
routerCart.delete('/delete/:idCart', verifyjson, deleteCart)
routerCart.get('/:idCart',verifyjson, getCartById)
routerCart.get('/',verifyjson, getCarts)
export default routerCart;