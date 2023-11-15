import express from 'express'
import { 
    createshippement,
} from '../Controllers/ShippemtController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerShippemt = express.Router()
routerShippemt.post('/create/:idOrder', verifyjson, createshippement)

export default routerShippemt;