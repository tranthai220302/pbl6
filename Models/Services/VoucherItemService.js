import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op } from "sequelize";
export const createVoucherItemService = async (data) =>{
    try {
        const checkVoucher = await db.voucherItem.findOne({
            where : {
                name : data.name
            }
        })
        if(checkVoucher) return createError(400, 'Voucher này đã được tạo!');
        const VoucherItem = await db.voucherItem.create(data);
        if(!VoucherItem) return createError(400, 'Thêm voucher không thành công!')
        return VoucherItem;
    } catch (error) {
        return error;
    }
}

export const getVoucherItemByStoreService = async(store_id) =>{
    try {
        const voucherItems = await db.voucherItem.findAll({
            where: {store_id}
        })
        if(voucherItems.length == 0) return createError(400, 'Không có voucher!');
        return voucherItems;
    } catch (error) {
        return error;
    }
}
export const updateVoucherItemService = async(data, id, store_id) =>{
    try {
        const updateVoucherItem = await db.voucherItem.update(data, {
            where : {
                [Op.and] : [
                    {id},
                    {store_id}
                ]
            }
        })
        if(updateVoucherItem[0] == 0) return createError(400, 'Chỉnh sửa không thành công!')
        return {
            status: true,
            message: 'Chỉnh sửa thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const deleteVoucherItemService = async(id, store_id) =>{
    try {
        const deleteVoucherItem = await db.voucherItem.destroy({
            where : {
                [Op.and] : [
                    {id},
                    {store_id}
                ]
            }
        })
        if(deleteVoucherItem == 0) return(createError(400, 'Xoá voucher không thành công!'))
        return {
            status: true,
            message: 'Xoá voucher thành công!'
        }
    } catch (error) {
        return error;
    }   
}
export const BookVoucherItemService = async(voucheritem_id, user_id) =>{
    try {
        const user = await db.user.findOne({
            where : {id: user_id}
        },);
        if(!user) return createError(400, 'Không tìm thấy người dùng!');
        const voucherItem = await db.voucherItem.findOne({
            where : {id: voucheritem_id}
        })
        const currentDate = new Date();
        if(voucherItem.quantity === 0) return createError(400, 'Số lượng Voucher đã hết!')
        if(voucherItem.expiryDate < currentDate) return createError(400, 'Voucher đã hết hạn!')
        if(!voucherItem) return createError(400, 'Không tìm thấy voucher!');
        await user.addVoucherItem(voucherItem);
        await voucherItem.decrement('quantity');
        return {
            status: true,
            message: 'Sưu tầm thành công!'
        };
    } catch (error) {
        return error;
    }
}