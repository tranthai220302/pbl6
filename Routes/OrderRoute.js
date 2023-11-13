import express from 'express'
import { 
    createOrder,
    deleteOrder,
    getOdrderByStore,
    getOrdersByCustomer,
    satistical7StoreHigh
} from '../Controllers/OrderController.js';
import { verifyjson } from '../middleware/jwt.js';
import { deleteBook } from '../Controllers/BookController.js';

const routerOrder = express.Router()
routerOrder.post('/create/:idBook', verifyjson, createOrder)
routerOrder.get('/customer',verifyjson, getOrdersByCustomer)
routerOrder.get('/store/:id',verifyjson, getOdrderByStore)
routerOrder.delete('/delete/:id', verifyjson, deleteOrder)
routerOrder.get('/satistical/:month', verifyjson, satistical7StoreHigh)
export default routerOrder;