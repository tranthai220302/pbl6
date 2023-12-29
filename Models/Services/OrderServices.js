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
export const createOrderService = async(BookId, customer_id, quantity, addressCustomer, priceShip, priceFreeShip, priceFreeVoucher, total, idVoucher) =>{
    try {
        if(!addressCustomer) return createError(400, 'Vui lòng nhập địa chỉ!')
        const book = await getBookByIdService(BookId)
        console.log(quantity)
        const store_id = book.store_id;
        const customer = await getUserByIdService(customer_id)
        const store = await getUserByIdService(store_id)
        const order = await db.order.create({   
            total_price : total,
            customer_id,
            BookId,
            store_id: book.store_id,
            isPayment : 0,
            StateId: 1,
            quantity : quantity,
            priceStore : quantity*(book.price),
            addressCustomer,
            addressStore : store.address,
            priceFreeShip,
            priceShip : priceShip,
            priceFreeVoucher,
            priceStore : total*0.8,
            priceAdmi : total*0.2
        })
        if(idVoucher.length > 0){
            const delete_FreeShip = await db.customer_voucherItem.destroy({
                where : {
                    [Op.and] : [
                        {voucherItem_id : idVoucher},
                        {user_id : customer_id}
                    ]
                }
            })
            if(delete_FreeShip === 0) return createError(400, 'Order không thành công!')
        }
        if(!order) return createError(400, 'Order không thành công!')  
        await sendEmail(customer, order, book, priceFreeVoucher, priceShip, priceFreeShip).catch(console.error);
        await book.increment('purchases', {by: 1});
        await book.save();
        return {
            message: 'Order thành công!',
            order,
        }
    } catch (error) {
        return error;
    }
}
export const createOrderPaymentOnlieService = async (total, quantity, addressCustomer,  BookId, customer_id, priceShip, priceFreeShip, priceFreeVoucher, idVoucher) =>
{
    try {
        if(!addressCustomer) return createError(400, 'Vui lòng nhập địa chỉ!')
        const book = await getBookByIdService(BookId)
        const store_id = book.store_id;
        const store = await getUserByIdService(store_id)
        const order = await db.order.create({   
            total_price : total,
            customer_id,
            BookId,
            store_id: book.store_id,
            isPayment : 1,
            StateId: 1,
            quantity : quantity,
            priceStore : total*0.8,
            priceAdmi : total*0.2,
            addressCustomer,
            addressStore : store.address,
            priceFreeShip,
            priceShip : priceShip,
            priceFreeVoucher,
        })
        if(idVoucher.length > 0){
            const delete_FreeShip = await db.customer_voucherItem.destroy({
                where : {
                    [Op.and] : [
                        {voucherItem_id : idVoucher},
                        {user_id : customer_id}
                    ]
                }
            })
            if(delete_FreeShip === 0) return createError(400, 'Order không thành công!')
        }
        if(!order) return createError(400, 'Order không thành công!');
        return order;
    } catch (error) {
        return error;
    }
}
export const getOrdersByCustomerService = async(customer_id, state_id) =>{
    try {
        if(state_id){
            const orders = await db.order.findAll({
                where : {
                    customer_id
                },
                include : [
                    {
                        model : db.user,
                        as : 'customer',
                        attributes: { exclude: ['password'] },
                    },
                    {
                        model : db.user,
                        as : 'store',
                        attributes: { exclude: ['password'] },
                        include : [
                            {
                                model : db.storeRequest,
                                as : 'DetailStore'
                            }
                        ]
                    },
                    {
                        model : db.state,
                        where : {
                            id : state_id
                        },
                        attributes: ['status'],
                    },
                    {
                        model : db.book,
                    },
                ]
            })
            if(orders.length == 0) return createError(400, 'Bạn không có đơn hàng!')
            return orders;
        }else if(state_id='false'){
            const orders = await db.order.findAll({
                where : {
                    customer_id
                },
                include : [
                    {
                        model : db.user,
                        as : 'customer',
                        attributes: { exclude: ['password'] },
                    },
                    {
                        model : db.user,
                        as : 'store',
                        attributes: { exclude: ['password'] },
                        include : [
                            {
                                model : db.storeRequest,
                                as : 'DetailStore'
                            }
                        ]
                    },
                    {
                        model : db.state,
                        attributes: ['status'],
                    },
                    {
                        model : db.book,
                    },
                ]
            })
            if(orders.length == 0) return createError(400, 'Bạn không có đơn hàng!')
            return orders;
        }
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
                    attributes: { exclude: ['password'] },
                },
                {
                    model : db.user,
                    as : 'store',
                    attributes: { exclude: ['password'] },
                    include : [
                        {
                            model : db.storeRequest,
                            as : 'DetailStore'
                        }
                    ]
                },
                {
                    model : db.state,
                    attributes: ['status'],
                },
                {
                    model : db.book,
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
export const totalPriceStoreService = async(store_id, month) =>{
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
export const drawPrecentSatiscalService = async(month) =>{
    try {
        const satisticalStore = [];
        const category = []
        const store = await db.user.findAll({
            where : {
                RoleId : 2
            },
        })
        console.log(store)
        for (const item of store) {
            const satistical = await totalPriceStoreService(item.id, month);
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
export const revenueDateByStoreService = async (date, month, year, store_id) =>{
    try {
        const orders = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                    `),
                    { store_id},
                    {isPayment : 1}
                ]
            }
        });
        let total = 0;
        orders.map((item)=>{
            item.priceStore ? total += item .priceStore : total += 0;
        })
        return total;
    } catch (error) {
        return error;
    }
}
export const revenueStoreByMonthService = async(idStore, month) =>{
    try {
        const date = new Date()
        const currentDate = new Date(date.getFullYear(), month, 0);
        const numDate = currentDate.getDate();
        const data = [];
        const dateTitle = []
        if(month > 0 && month  < 13){
            for(let i = 1; i <= numDate; i++){
                const totalByDate = await revenueDateByStoreService(i, month, date.getFullYear(), idStore);
                data.push(totalByDate);
                dateTitle.push(i)
            }
            return {
                data,
                dateTitle
            }
        }
        return createError(400, 'Tháng không chính xác!')
    } catch (error) {
        return error;
    }
}
export const getNumOrderByDateByStoreService = async (date, month, year, store_id) =>{
    try {
        const orders = await db.order.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                    `),
                    { store_id},
                ]
            }
        });
        return orders.length;
    } catch (error) {
        return error;
    }
}
export const getNumOrderBy7DateService = async (store_id) =>{
    try {
        const today = new Date();
        const daysOfWeek = [];
        for(let i = 0; i < 7; i++){
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            daysOfWeek.push(day);
        }
        const dateTitle = [];
        const data = [];
        for(const date of daysOfWeek){
            const dateItem = await getNumOrderByDateByStoreService(date.getDate(), date.getMonth() + 1, date.getFullYear(), store_id)
            data.push(dateItem);
            dateTitle.push(`${date.getDate()}-${date.getMonth()}`);
        }
        return {
            data,
            dateTitle
        }
    } catch (error) {
        return error;
    }
}
export const revenueByAdminService = async(month) =>{
    try {
        const revenuaAdmin = await db.order.sum('priceAdmi',{
            where : {
                [Op.and] : [
                    {isPayment : 1},
                    Sequelize.literal(`MONTH(createdAt) = ${month}`),
                    { priceAdmi: { [Op.not]: null } } 
                ]
            }
        })
        return {
            doanhthu : revenuaAdmin
        };
    } catch (error) {
        return error;
    }
}
export const revenuaAdminByDateSerVice = async(date, month, year) =>{
    try {
        if(month < 13 && month > 1){
            let revenuaAdmin = await db.order.sum('priceAdmi',{
                where : {
                    [Op.and] : [
                        {isPayment : 1},
                        Sequelize.literal(`
                        DAY(createdAt) = ${date} AND
                        MONTH(createdAt) = ${month} AND
                        YEAR(createdAt) = ${year}
                        `),
                        { priceAdmi: { [Op.not]: null } } 
                    ]
                }
            })
            if(revenuaAdmin){
                return {
                    doanhthu : revenuaAdmin
                };   
            }
            return {
                doanhthu : 0
            };
        }
        return createError(400, 'Dữ liệu không hợp lệ!')
    } catch (error) {
        return error;
    }
}

export const confirmOrderByStoreService = async(id, store_id) =>{
    try {
        const checkOrder = await db.order.findOne({
            where : {
                [Op.and] : [
                    {id},
                    {StateId : 2}
                ]
            }
        })
        if(checkOrder) return createError(400, 'Bạn đã xác nhận đơn hàng này!')
        const orderUpdate = await db.order.update({
            StateId : 2
        }, {
            where : {
                [Op.and] : [
                    {id},
                    {store_id}
                ]
            }
        })
        if(orderUpdate[0] === 0) return createError(400, 'Xác nhân đơn hàng không thành công!');
        return {
            message : 'Xác nhận thành công!'
        }
    } catch (error) {
        return error;

    }
}
export const revenuaMonthByAdminService = async (month) =>{
    try {
        try {
            const date = new Date()
            const currentDate = new Date(date.getFullYear(), month, 0);
            const numDate = currentDate.getDate();
            const data = [];
            const dateTitle = []
            if(month > 0 && month  < 13){
                for(let i = 1; i <= numDate; i++){
                    const totalByDate = await revenuaAdminByDateSerVice(i, month, date.getFullYear());
                    data.push(totalByDate.doanhthu);
                    const dateT = new Date(date.getFullYear(), month-1, i)
                    console.log(dateT)
                    dateTitle.push(dateT)
                }
                return {
                    data,
                    dateTitle
                }
            }
            return createError(400, 'Tháng không chính xác!')
        } catch (error) {
            return error;
        }
    } catch (error) {
        
    }
}

export const cancelOrderByStoreService = async(id, store_id) =>{
    try {
        const checkOrder = await db.order.findOne({

            where : {
                [Op.and] : [
                    {id},
                    {
                        [Op.or]: [
                            { StateId: 1 },
                            { StateId: 2 }
                        ]
                    }
                ]
            }
        })
        if(checkOrder) return createError(400, 'Bạn không thể hủy đơn hàng này!')
        const orderUpdate = await db.order.update({
            StateId : 6
        }, {
            where : {
                [Op.and] : [
                    {id},
                    {store_id}
                ]
            }
        })
        if(orderUpdate[0] === 0) return createError(400, 'Hủy đơn không thành công!');
        return {
            message : 'Hủy đơn thành công!'
        }
    } catch (error) {
        return error;

    }
}