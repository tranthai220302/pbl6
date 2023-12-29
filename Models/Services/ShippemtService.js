import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";
import Sequelize from "sequelize";
import { distance } from "../../ultis/distance.js";

export const createShippemtService = async(orderId, shipper_Id) =>{
    try {
        // Kiểm tra trạng thái của đơn hàng trước khi tạo shipment
        const order = await db.order.findOne({ where: { id: orderId } });

        if (!order || order.StateId !== 2) {
            return createError(400, 'Không thể nhận đơn hàng!');
        }

        const store_id = order.store_id;
        const store = await db.user.findOne({ where: { id: store_id}})

        const customer_id = order.customer_id;
        const customer = await db.user.findOne({ where: { id: customer_id}})

        const shippemt = await db.shippemt.create({
            start_address : store.address,
            end_address : customer.address,
            OrderId : orderId,
            shipperId: shipper_Id
        })
        
    
        if (!shippemt) return createError(400, 'Đơn hàng chưa có ai nhận!')

        const update_order = await db.order.update(
            {StateId: 3},
            {where: {id: orderId}}
        )

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đã nhận đơn hàng!',
            shippemt
            
        }    
    } catch (error) {
        return error;   
    }
}

export const update_state_successfulService = async(id) =>{
    try {
        
        const order = await db.order.findOne({ where: { id: id } });

        if (!order || order.StateId !== 3) {
            return createError(400, 'Đơn hàng chưa được vận chuyển!');
        }

        const update_order = await db.order.update(
            {StateId: 4},
            {where: {id: id}}
        )

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đơn hàng đã giao thành công!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

export const update_state_failedService = async(id) =>{
    try {
        
        const order = await db.order.findOne({ where: { id: id } });

        if (!order || order.StateId !== 3) {
            return createError(400, 'Đơn hàng chưa được vận !');
        }

        const update_order = await db.order.update(
            {StateId: 5},
            {where: {id: id}}
        )

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Giao hàng không thành công!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

export const getOrdersService = async() =>{
    try {
        const orders = await db.order.findAll({
            where: {
                StateId: 2
            }
        });
         // Kiểm tra nếu không có shipment nào được tìm thấy
         if (orders.length === 0) return createError(400, 'Không có đơn hàng!');

        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getOrdersByShipperService = async(id) =>{
    try {
        const orders = await db.shippemt.findAll({
            where: {
                shipperId: id
            },
            include: [
                {
                    model: db.order
                }
            ]
        });

        // Kiểm tra nếu không có shipment nào được tìm thấy
        if (orders.length === 0) return createError(400, 'Không có đơn hàng!');
        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}


export const getOrdersDeliveringService = async(id) =>{
    try {
        const orders = await db.shippemt.findAll({
            where: {
                shipperId: id
            },
            include: [
                {
                    model: db.order,
                    where: {
                        StateId: 3
                    }
                }
            ]
        });

        // Kiểm tra nếu không có shipment nào được tìm thấy
        if (orders.length === 0) return createError(400, 'Không có đơn hàng!');
        return orders;
    } catch (error) {
        console.error(error);
        return error;
    }
}
