import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";

export const createShippemtService = async(orderId, shipperId) =>{
    try {
        const shippemt = await db.shippemt.create({
            start_address,
            end_address,
            orderId,
            shipperId
        })
    
        if (!shippemt) return createError(400, 'Đơn hàng không được vận chuyển!')
        return {
            message: 'Đơn hàng đã tìm được người vận chuyển!',
            shippemt,
        }    
    } catch (error) {
        return error;   
    }
}

export const getShippemtbyShipperService = async(shipper_id) =>{
    try {
        const shippemt = await db.shippemt.findAll({
            where : {
                shipper_id
            }
        })
        if(shippemt.length == 0) return createError(400, 'Bạn không có đơn hàng nào cần vận chuyển!')
        return shippemt;
    } catch (error) {
        return error;
    }
}