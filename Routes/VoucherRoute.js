import express from 'express'
import { 
    createVoucher, 
    deleteVoucher, 
    getVouchers, 
} from '../Controllers/VoucherController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerVoucher = express.Router()
routerVoucher.post('/create', verifyjson, createVoucher)
routerVoucher.delete('/delete/:id', verifyjson, deleteVoucher)
routerVoucher.get('/', getVouchers)
export default routerVoucher;