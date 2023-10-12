import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";
import { Op } from "sequelize";
import sendEmail from "../../ultis/sendEmail.js";
import { priceVoucherStoreByCustomer} from "./VoucherItemService.js";
import { distance } from "../../ultis/distance.js";
import { getUserByIdService } from "./UserService.js";
import { getBookByIdService } from "./BookService.js";
export const priceVoucherStore = async()=>{

}
export const createOrderService = async(BookId, customer_id, quantity, isPayment) =>{
    try {
        const book = await getBookByIdService(BookId)
        const store_id = book.store_id;
        const customer = await getUserByIdService(customer_id)
        const store = await getUserByIdService(store_id)
        const order = await db.order.create({
            total_price : quantity*(book.price),
            customer_id,
            BookId,
            store_id: book.store_id,
            isPayment,
            StateId: 1,
            quantity : quantity
        })
        if(!order) return createError(400, 'Order không thành công!')
        var currentTotal = order.total_price;
        const priceVS = await priceVoucherStoreByCustomer(customer_id, 1, store_id, currentTotal);
        const priceFS = await priceVoucherStoreByCustomer(customer_id, 2, store_id, currentTotal);
        const kc = await distance(customer.address, store.address)
        if(kc instanceof Error) return kc;
        const priceShip = parseInt((kc/1000)*5000);
        if(priceShip <= priceFS.price_free) priceFS.price_free = priceShip;
        order.total_price = currentTotal + priceShip - (priceVS.price_free + priceFS.price_free);
        await order.save();   
        await sendEmail(customer, order, book, priceVS.price_free, priceShip, priceFS.price_free).catch(console.error);
        return {
            message: 'Order thành công!',
            order,
            vouchersStore: priceVS.voucher,
            FreeShip: priceFS.voucher
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