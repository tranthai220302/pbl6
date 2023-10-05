import express from 'express'
import { 
    createOrder,
    getOrdersByCustomer
} from '../Controllers/OrderController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerOrder = express.Router()
routerOrder.post('/create/:idBook', verifyjson, createOrder)
routerOrder.get('/customer',verifyjson, getOrdersByCustomer)
export default routerOrder;