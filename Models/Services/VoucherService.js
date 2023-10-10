import createError from "../../ultis/createError.js"
import db from "../Entitys/index.js"
export const createVoucherService = async(type) =>{
    try {
        const voucher = await db.voucher.create({
            type,
        })
        if(!voucher) createError(400, 'Thêm loại giảm giá không thành công!')
    } catch (error) {
        return error;
    }
}
export const getVouchersService = async() =>{
    try {
        const vouchers = await db.voucher.findAll();
        if(vouchers.length == 0) return {
            message: "Không có loại giảm giá!"
        }
        return vouchers;
    } catch (error) {
        return error;
    }
}
export const deleteVoucherService = async(id) =>{
    try {
        const delete_voucher = await db.voucher.destroy({
            where : {id}
        })
        if(delete_voucher == 0) return createError(400, 'Xoá voucher không thành công!');
        return delete_voucher;
    } catch (error) {
        return error;
    }
}
