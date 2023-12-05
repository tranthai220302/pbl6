import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";

export const update_state_by_storeService = async(orderId, storeId) =>{
    try {
        const order = await db.order.findOne({ where: { id: orderId } });

        if (!order || order.StateId !== 1) {
            return createError(400, 'Không thể xác nhận đơn hàng!');
        }

        const store_id = order.store_id
        if (store_id !== storeId) {
            return createError(400, 'Không thể xác nhận đơn hàng!!!');
        }

        const update_order = await db.order.update(
            {StateId: 2},
            {where: {id: orderId}}
        )

        if (update_order[0] == 0) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đã xác nhận đơn hàng!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

export const createShippemtService = async(orderId, shipperId) =>{
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
            shipperId
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
            message: 'Đã nhận giao hàng!',
            shippemt,
        }    
    } catch (error) {
        return error;   
    }
}

export const update_state_by_ShippemtService = async(orderId, shipper_id) => {
    try {
        const order = await db.order.findOne({ where: { id: orderId } });
        if (!order || order.StateId !== 3) {
            return createError(400, 'Không thể xác nhận đang giao đơn hàng!');
        }
        
        const shipment = await db.shippemt.findOne({ where: { OrderId: orderId}})
        if (!shipment || shipment.shipperId !== shipper_id) {
            return createError(400, 'Không thể xác nhận đang giao đơn hàng!')
        }

        const update_order = await db.order.update(
            {StateId: 4},
            {where: {id: orderId}}
        )

        if (!update_order) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đang giao hàng!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

export const update_state_end_by_custommerService = async(orderId, customerId) => {
    try {
        const order = await db.order.findOne({ where: { id: orderId } });

        if (!order || order.StateId !== 5) {
            return createError(400, 'Không thể nhận đơn hàng!');
        }

        if (order.customer_id !== customerId) {
            return createError(400, 'Không thể nhận đơn hàng!!!');
        }

        const update_order = await db.order.update(
            {StateId: 7},
            {where: {id: orderId}}
        )

        if (update_order[0] == 0) {
            return createError(400, 'Không thể cập nhật trạng thái đơn hàng!');
        }

        return {
            message: 'Đã xác nhận đơn hàng!',
            update_order,
        }    
    } catch (error) {
        return error;   
    }
}

