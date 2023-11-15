import db from "../Entitys/index.js";
import createError from "../../ultis/createError.js";
import { Op, where } from "sequelize";
import sendEmail from "../../ultis/sendEmail.js";
import { priceVoucherStoreByCustomer} from "./VoucherItemService.js";
import { distance } from "../../ultis/distance.js";
import { getUserByIdService } from "./UserService.js";
import { getBookByIdService } from "./BookService.js";
import Sequelize from "sequelize";
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
            quantity : quantity,
            priceStore : quantity*(book.price)
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
        order.priceStore = currentTotal + priceVS.price_free;
        await order.save();   
        await sendEmail(customer, order, book, priceVS.price_free, priceShip, priceFS.price_free).catch(console.error);
        console.log(priceShip)
        return {
                                           
            vouchersStore: priceVS.voucher,
            FreeShip: priceFS.voucher,
            priceShip: priceShip
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
export const getOrderByStoreService = async(store_id) =>{
    try {
        const store = await db.user.findByPk(store_id)
        if(!store) return createError(400, 'Không tìm thấy cửa hàng!')
        const orders = await db.order.findAll({
            where : {
                store_id : store_id
            },
            include : [
                {
                    model : db.user,
                    as : 'customer',
                    attributes: ['firstName', 'lastName'],
                },
                {
                    model : db.user,
                    as : 'store',
                    attributes: ['firstName', 'lastName'],
                },
                {
                    model : db.state,
                    attributes: ['status'],
                },
                {
                    model : db.book,
                    attributes: ['name'],
                },
            ]
        })
        if(orders.lengths == 0) return createError(400, 'Không có order !')
        return orders;
    } catch (error) {
        return error;
    }
}
export const deleteOrderService = async(id) =>{
    try {
        
        const order = await db.order.destroy({
            where : {id}
        })
        if(order == 0) return createError(400, 'Xoá đơn hàng không thành công!')
        return{
            status : true,
            message : 'Xoá đơn hàng thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const satisticalByStoreService = async(store_id, month) =>{
    try {
        const satistical = await db.order.findAll({
            where : {
                [Op.and] : [
                    {store_id},
                    {isPayment : 1},
                    Sequelize.literal(`MONTH(createdAt) = ${month}`),
                ]
            }
        })

        let total = 0;
        satistical.map((item)=>{
            total += item.priceStore
        })
        return total;
    } catch (error) {
        return error;
    }
}
export const totalPriceStoreService = async(store_id) =>{
    try {
        const satistical = await db.order.findAll({
            where : {
                [Op.and] : [
                    {store_id},
                    {isPayment : 1},
                ]
            }
        })

        let total = 0;
        satistical.map((item)=>{
            total += item.priceStore
        })
        return total;
    } catch (error) {
        return error;
    }
}
export const satistical7StoreHighService = async(month) =>{
    try {
        const store = await db.user.findAll({
            where : {RoleId : 2}
        })
        const storeArray = []
        for (const item of store) {
            const satistical = await satisticalByStoreService(item.id, month);
            if(satistical instanceof Error) return satistical;
            storeArray.push({ storeId: item.id, satistical: satistical, month, store: item });
          }
        const topStores = storeArray
            .sort((a, b) => b.satistical - a.satistical) 
            .slice(0, 10);
        const category = [];
        const data = [];
        const storeA = [];
        topStores.map((item)=>{
            category.push(item.store.firstName + item.store.lastName);
            data.push(item.satistical);
            storeA.push(item.store)
        })
        return {
            category,
            data,
            storeA
        }
    } catch (error) {
        return error;
    }
}
export const drawPrecentSatiscalService = async() =>{
    try {
        const satisticalStore = [];
        const category = []
        const store = await db.user.findAll({
            where : {RoleId : 2}
        })
        for (const item of store) {
            const satistical = await totalPriceStoreService(item.id);
            if(satistical instanceof Error) return satistical;
            satisticalStore.push(satistical);
            category.push(item.lastName + item.firstName)
        }
        return {
            store : satisticalStore,
            category
        }
    } catch (error) {
        return error;   
    }
}

