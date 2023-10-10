import { BookVoucherItemService } from "../Models/Services/VoucherItemService.js";
import { 
    createVoucherService, 
    deleteVoucherService, 
    getVouchersService 
    } 
from "../Models/Services/VoucherService.js";
import createError from "../ultis/createError.js"

export const createVoucher = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const type = data.body.type;
        if(!type) return next(createError(400, 'Nhập đầy đủ thông tin'));
        const voucher = await createVoucherService(type);
        if(voucher instanceof Error) return next(voucher);
        res.status(200).send(voucher);
    } catch (error) {
        next(error)
    }
}
export const getVouchers = async(req, res, next) =>{
    try {
        const vouchers = await getVouchersService();
        return vouchers;
    } catch (error) {
        next(error)
    }
}
export const deleteVoucher = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!')); 
        const delete_voucher = await deleteVoucherService(req.params.id);
        if(delete_voucher instanceof Error) return next(delete_voucher);
        return delete_voucher;
    } catch (error) {
        next(error)
    }
}
export const BookVoucherItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'));
        const voucheritem_id = req.params.id;
        const user_id = req.id;
        const book_voucherItem = await  BookVoucherItemService(voucheritem_id, user_id);
        if(book_voucherItem instanceof Error) return next(book_voucherItem)
        res.status(200).send(book_voucherItem)
    } catch (error) {
        
    }
}