import { isDate } from "date-fns";
import { 
    createVoucherItemService, 
    deleteVoucherItemService, 
    getVoucherItemByStoreService, 
    updateVoucherItemService,
    BookVoucherItemService, 
    getVoucher_FreeShipService,
    } 
from "../Models/Services/VoucherItemService.js";
import createError from "../ultis/createError.js";
import { Op } from "sequelize";

export const createVoucherItem = async (req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const body = req.body;
        const data = {
            ...(body.name && {name : body.name}),
            ...(body.discountValue && {discountValue : body.discountValue}),
            ...(body.discountType && {discountType : body.discountType}),
            ...(body.expiryDate && {expiryDate : body.expiryDate}),
            ...(body.quantity && {quantity : body.quantity}),
            ...(body.codition && {codition : body.codition}),
            ...(body.VoucherId && {VoucherId : body.VoucherId}),
            ...(req.params.id && {store_id : req.params.id}),
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
        const name = req.query.name;
        const store_id = req.params.id;
        const filter = {
            ...(req.query.name && {
                name : {
                    [Op.like] : `%${name}%`
                }
            }),
            store_id,
            VoucherId : 1
        }
        const voucherItems = await getVoucherItemByStoreService(filter);
        if(voucherItems instanceof Error) return next(voucherItems);
        res.status(200).send(voucherItems);
    } catch (error) {
        next(error);
    }
}

export const updateVoucherItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !==4) return next(createError(400, 'Bạn không có quyền này!'));
        const body = req.body;
        const data = {
            ...(body.name && {name : body.name}),
            ...(body.discountValue && {discountValue : body.discountValue}),
            ...(body.discountType && {discountType : body.discountType}),
            ...(body.expiryDate && {expiryDate : body.expiryDate}),
            ...(body.quantity && {quantity : body.quantity}),
            ...(body.codition && {codition : body.codition}),
        } 
        const update_VoucherItem = await updateVoucherItemService(data, req.params.id)
        if(update_VoucherItem instanceof Error) return next(update_VoucherItem);
        res.status(200).send(update_VoucherItem)
    } catch (error) {
        next(error);
    }
}
export const deleteVoucherItem = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !==4) return next(createError(400, 'Bạn không có quyền này!'));
        const idVoucher = req.params.id;
        const store_id = req.id;
        let isAdmin = false;
        if(req.idRole == 4) isAdmin = true;
        const delete_Voucher = await deleteVoucherItemService(idVoucher, store_id, isAdmin);
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
        next(error)
    }
}
export const getVoucher_FreeShip = async(req, res, next) =>{
    try {
        const currentDate = new Date();
        const name = req.query.name;
        const store_id = req.params.id;
        const isExpire = req.query.isExpire;
        const filter = {
            ...(req.query.name && {
                name : {
                    [Op.like] : `%${name}%`
                }
            }),
            store_id,
            VoucherId : 2,
            ...(isExpire && {
                expiryDate : {
                    [Op.lt] : currentDate
                }
            })
        }
        const vouchers = await getVoucher_FreeShipService(filter);
        if(vouchers instanceof Error) return next(vouchers);
        return res.status(200).send(vouchers);
    } catch (error) {
        next(error)
    }
}
