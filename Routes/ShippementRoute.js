import express from 'express'
import { 
    createshippemt,
    update_state_successful,
    update_state_failed,
    getOrdersByShipper,
    getOrdersDelivering,
    getOrders,
    getOrdersComplete,
    revenueShipperByMonth,
    totalPriceShipper,
    getNumOrderBy7Date,
    numberOrderFailedByShipper,
    priceShipper,
    updateShipper,

} from '../Controllers/ShippemtController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerShippemt = express.Router()
routerShippemt.post('/create/:idOrder',verifyjson, createshippemt)
routerShippemt.put('/state-successful/:id',verifyjson, update_state_successful)
routerShippemt.put('/state-failed/:id',verifyjson, update_state_failed)
routerShippemt.get('/',verifyjson, getOrders)
routerShippemt.get('/get-orders',verifyjson, getOrdersByShipper)
routerShippemt.get('/delivering',verifyjson, getOrdersDelivering)
routerShippemt.get('/complete', verifyjson, getOrdersComplete)
routerShippemt.post('/revenueShipper/:month', verifyjson, revenueShipperByMonth)
routerShippemt.get('/drawShipper/:month', verifyjson, totalPriceShipper)
routerShippemt.get('/numOrder7date/', verifyjson, getNumOrderBy7Date)
routerShippemt.get('/numberOrderFailed/:month', verifyjson, numberOrderFailedByShipper)
routerShippemt.get('/priceShip', verifyjson, priceShipper)
routerShippemt.put('/edit',verifyjson, updateShipper)
export default routerShippemt;