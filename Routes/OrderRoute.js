import express from 'express'
import { 
    createOrder,
    deleteOrder,
    drawPrecentSatiscal,
    getOdrderByStore,
    getOrdersByCustomer,
    satistical7StoreHigh,
} from '../Controllers/OrderController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerOrder = express.Router()
routerOrder.post('/create/:idBook', verifyjson, createOrder)
routerOrder.get('/customer',verifyjson, getOrdersByCustomer)
routerOrder.get('/store/:id',verifyjson, getOdrderByStore)
routerOrder.delete('/delete/:id', verifyjson, deleteOrder)
routerOrder.get('/satistical/:month', verifyjson, satistical7StoreHigh)
routerOrder.get('/draw', verifyjson, drawPrecentSatiscal)
export default routerOrder;