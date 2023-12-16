import express from 'express'
import { 
    update_state_by_store,
    createshippemt,
    update_state_successful,
    update_state_failed
} from '../Controllers/ShippemtController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerShippemt = express.Router()
routerShippemt.put('/state-store/:idOrder', verifyjson, update_state_by_store)
routerShippemt.post('/create/:idOrder',verifyjson, createshippemt)
routerShippemt.put('/state-successful/:id',verifyjson, update_state_successful)
routerShippemt.put('/state-failed/:id',verifyjson, update_state_failed)


export default routerShippemt;