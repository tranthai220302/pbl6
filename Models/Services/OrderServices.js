import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";
export const createOrderService = async(BookId, customer_id, quantity, isPayment) =>{
    try {
        const book = await db.book.findOne({where: {id: BookId}})
        if(!book) return createError(400, 'Vui lòng chọn sản phẩm bạn muốn mua!')
        const order = await db.order.create({
            total_price : quantity*quantity,
            customer_id,
            BookId,
            store_id: book.store_id,
            isPayment
        })
        if(!order) return createError(400, 'Order không thành công!')
        return {
            message: 'Order thành công!',
            order
        }
    } catch (error) {
        return error;
    }
}
export const getOrdersByCustomerService = async(customer_id) =>{
    try {
        const orders = await db.order.findAll({
            where : {
                customer_id
            }
        })
        if(orders.length == 0) return createError(400, 'Bạn không có đơn hàng!')
        return orders;
    } catch (error) {
        return error;
    }
}