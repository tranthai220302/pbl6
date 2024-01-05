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
    updateShipper,
    OrderSuccessFullShipperByMonth,
    OrderFailedShipperByMonth,
    OrderShipperByMonth,

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
routerShippemt.post('/orderSucessfull/:month', verifyjson, OrderSuccessFullShipperByMonth)
routerShippemt.post('/orderFailed/:month', verifyjson, OrderFailedShipperByMonth)
routerShippemt.post('/order/:month', verifyjson, OrderShipperByMonth)
routerShippemt.put('/edit',verifyjson, updateShipper)
export default routerShippemt;