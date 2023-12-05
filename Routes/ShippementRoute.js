import express from 'express'
import { 
    update_state_by_store,
    createshippemt,
    update_state_end_by_custommer,
    update_state_by_Shippemt
} from '../Controllers/ShippemtController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerShippemt = express.Router()
routerShippemt.put('/state-store/:idOrder', verifyjson, update_state_by_store)
routerShippemt.post('/create/:idOrder',verifyjson, createshippemt)
routerShippemt.put('/state-end/:idOrder',verifyjson,update_state_end_by_custommer)
routerShippemt.put('/state-shipper/:idOrder',verifyjson,update_state_by_Shippemt)

export default routerShippemt;