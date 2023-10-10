import { 
    createVoucherItemService, 
    deleteVoucherItemService, 
    getVoucherItemByStoreService, 
    updateVoucherItemService,
    BookVoucherItemService 
    } 
from "../Models/Services/VoucherItemService.js";
import createError from "../ultis/createError.js";

export const createVoucherItem = async (req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const body = req.body;
        const data = {
            ...(body.name && {name : body.name}),
            ...(body.discountValue && {discountValue : body.discountValue}),
            ...(body.discountType && {discountType : body.discountType}),
            ...(body.expiryDate && {expiryDate : body.expiryDate}),
            ...(body.quantity && {quantity : body.quantity}),
            ...(body.codition && {codition : body.codition}),
            ...(body.VoucherId && {VoucherId : body.VoucherId}),
            ...(req.id && {store_id : req.id}),
        } 
        const VoucherItem = await createVoucherItemService(data)
        if(VoucherItem instanceof Error) return next(VoucherItem);
        res.status(200).send(VoucherItem);
    } catch (error) {
        next(error);
    }
}

export const getVoucherItemByStore = async(req, res, next) =>{
    try {
        const voucherItems = await getVoucherItemByStoreService(req.params.id);
        if(voucherItems instanceof Error) return next(voucherItems);
        res.status(200).send(voucherItems);
    } catch (error) {
        next(error);
    }
}

export const updateVoucherItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const body = req.body;
        const data = {
            ...(body.name && {name : body.name}),
            ...(body.discountValue && {discountValue : body.discountValue}),
            ...(body.discountType && {discountType : body.discountType}),
            ...(body.expiryDate && {expiryDate : body.expiryDate}),
            ...(body.quantity && {quantity : body.quantity}),
            ...(body.codition && {codition : body.codition}),
        } 
        const update_VoucherItem = await updateVoucherItemService(data, req.params.id, req.id)
        if(update_VoucherItem instanceof Error) return next(update_VoucherItem);
        res.status(200).send(update_VoucherItem)
    } catch (error) {
        next(error);
    }
}
export const deleteVoucherItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const idVoucher = req.params.id;
        const store_id = req.id;
        const delete_Voucher = await deleteVoucherItemService(idVoucher, store_id);
        if(delete_Voucher instanceof Error) return next(delete_Voucher);
        res.status(200).send(delete_Voucher);
    } catch (error) {
        next(error);
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