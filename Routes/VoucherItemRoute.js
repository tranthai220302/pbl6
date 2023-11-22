import express from 'express'
import { 
    createVoucherItem, 
    getVoucherItemByStore,
    updateVoucherItem,
    deleteVoucherItem,
    BookVoucherItem,
    getVoucher_FreeShip,
} from '../Controllers/VoucherItemController.js';
import { verifyjson } from '../middleware/jwt.js';

const routerVoucherItem = express.Router()
routerVoucherItem.post('/create/:id', verifyjson, createVoucherItem)
routerVoucherItem.get('/:id', verifyjson, getVoucherItemByStore)
routerVoucherItem.put('/update/:id', verifyjson, updateVoucherItem)
routerVoucherItem.delete('/delete/:id', verifyjson, deleteVoucherItem)
routerVoucherItem.post('/bookVoucher/:id',verifyjson, BookVoucherItem)
routerVoucherItem.get('/list/free_ship/:id', verifyjson, getVoucher_FreeShip)
export default routerVoucherItem;