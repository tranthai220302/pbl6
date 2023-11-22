import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
import { Op, where } from "sequelize";
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

export const getVoucherItemByStoreService = async(filter) =>{
    try {
        const voucherItems = await db.voucherItem.findAll({
            where: {
                [Op.and] : filter
            },
            include : {
                model : db.voucher
            }
        })
        if(voucherItems.length == 0) return createError(400, 'Không có voucher!');
        return voucherItems;
    } catch (error) {
        return error;
    }
}
export const updateVoucherItemService = async(data, id) =>{
    try {
        console.log(data)
        const updateVoucherItem = await db.voucherItem.update(data, {
            where : {
                [Op.and] : [
                    {id},
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
export const deleteVoucherItemService = async(id, store_id, isAdmin) =>{
    try {
        let filter;
        if(isAdmin){
            filter = {
                id
            }
        }else {
        filter = {
                [Op.and] : [
                    {id},
                    {store_id}
                ]
            }
        }

        const deleteVoucherItem = await db.voucherItem.destroy({
            where : filter
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
        const checkVoucher = await db.voucherItem.findByPk(voucheritem_id)
        if(!checkVoucher) return createError(400, 'Không tìm thấy voucher!')
        const checkUserBookVoucher = await db.customer_voucherItem.findOne({
            where :{
                user_id,
                voucherItem_id: voucheritem_id
            }
        });
        if(checkUserBookVoucher) return createError(400, 'Bạn đã sưu tầm Voucher này!')
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
export const getVoucherItemByCustomer = async(customer_id, voucher_id, store_id, currentTotal) =>{
    try {
        const currentDate = new Date();
        const list_voucher = await db.voucherItem.findAll({
            include: [
              {
                model: db.user,
                attributes: ['id'],
                where: { id: customer_id },
              },
              {
                model: db.voucher,
                attributes: ['type'],
                where: { id: voucher_id },
              },
            ],
            where: {
              [Op.and]: [
                { store_id },
                { expiryDate: { [Op.gte]: currentDate } },
                { codition: { [Op.lte]: currentTotal } },
              ],
            },
        });
        if(list_voucher.length === 0) return createError(400, 'Không có voucher!')
        const maxVoucher = list_voucher.reduce((max, voucher) => (voucher.codition > max.codition ? voucher : max), list_voucher[0]);
        return maxVoucher;
    } catch (error) {
        return error;
    }
}
export const priceVoucherStoreByCustomer = async(customer_id, voucher_id, store_id, currentTotal) =>{
    try {
        const voucher = await getVoucherItemByCustomer(customer_id, voucher_id, store_id, currentTotal)
        if(voucher instanceof Error) return {
            price_free :0
        };
        var price_free = 0;
        var total_first = currentTotal;
        if(voucher_id == 1){
            if (voucher.discountType === 'amount') {
                price_free += voucher.discountValue;
            }else if (voucher.discountType === 'percent') {
                price_free += (total_first * voucher.discountValue) / 100
            }
        }else if(voucher_id == 2){
            price_free += voucher.discountValue;
        }
        return {
            voucher: voucher,
            price_free
        };
    } catch (error) {
        return error;
    }
}
export const getVoucher_FreeShipService = async(filter) =>{
    try {
        const voucher_freeShip = await db.voucherItem.findAll({
            where : {
                [Op.and] : [filter]
            }
        })
        if(voucher_freeShip.length == 0) return createError(400, 'Không có voucher FreeShip')
        return voucher_freeShip;
    } catch (error) {
        return error;
    }
}

