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
        const type = req.body.type;
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
        return res.status(200).send(vouchers);
    } catch (error) {
        next(error)
    }
}
export const deleteVoucher = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!')); 
        const delete_voucher = await deleteVoucherService(req.params.id);
        if(delete_voucher instanceof Error) return next(delete_voucher);
        return res.status(200).send(delete_voucher);
    } catch (error) {
        next(error)
    }
}
