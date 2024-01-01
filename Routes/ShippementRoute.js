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
    drawPrecentSatiscal,
    satistical7ShipperHigh,
    getNumOrderBy7Date,
    numberOrderFailedByShipper
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
routerShippemt.post('/revenueShipper/:id', verifyjson, revenueShipperByMonth)
routerShippemt.get('/drawShipper/:month', verifyjson, drawPrecentSatiscal)
routerShippemt.get('/satisticalShipper/:month', verifyjson, satistical7ShipperHigh)
routerShippemt.get('/numOrder7date/:id', verifyjson, getNumOrderBy7Date)
routerShippemt.get('/numberOrderFailed/:month', verifyjson, numberOrderFailedByShipper)
export default routerShippemt;