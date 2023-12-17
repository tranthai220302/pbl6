import express from 'express'

import { 
    createOrder,
    deleteOrder,
    revenueStoreByMonth,
    drawPrecentSatiscal,
    getOdrderByStore,
    getOrdersByCustomer,
    satistical7StoreHigh,

    update_state_oder,
    update_state_oder_2,

    getNumOrderBy7Date,
    revenueByAdmin,
    createPaymentUrl,
    vpnayReturn,
    priceShipController,
} from '../Controllers/OrderController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerOrder = express.Router()
routerOrder.post('/create/:idBook', verifyjson, createOrder)
routerOrder.get('/customer',verifyjson, getOrdersByCustomer)
routerOrder.get('/store/:id',verifyjson, getOdrderByStore)
routerOrder.delete('/delete/:id', verifyjson, deleteOrder)
routerOrder.get('/satistical/:month', verifyjson, satistical7StoreHigh)

routerOrder.put('/state-successful/:id',verifyjson, update_state_oder)
routerOrder.put('/state-failed/:id',verifyjson, update_state_oder_2)

routerOrder.get('/draw/:month', verifyjson, drawPrecentSatiscal)
routerOrder.post('/revenue/:id', verifyjson, revenueStoreByMonth)
routerOrder.get('/numOrder7date/:id', verifyjson, getNumOrderBy7Date)
routerOrder.post('/revenueAdmin', verifyjson, revenueByAdmin)
routerOrder.post('/detailOrder/:id', verifyjson, priceShipController)
routerOrder.post('/create_payment_url/:id',verifyjson, createPaymentUrl);
routerOrder.get('/vnpay_return', vpnayReturn);

export default routerOrder;