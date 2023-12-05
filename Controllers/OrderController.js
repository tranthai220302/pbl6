import { 
    createOrderService, 
    deleteOrderService, 
    revenueStoreByMonthService, 
    drawPrecentSatiscalService, 
    getOrderByStoreService, 
    getOrdersByCustomerService, 
    satistical7StoreHighService,

    update_state_oder2Service,
    update_state_oderService,

    getNumOrderByDateByStoreService,
    getNumOrderBy7DateService,
    revenueByAdminService,
    revenuaAdminByDateSerVice

} 
from "../Models/Services/OrderServices.js";
import { ConfirmStoreService } from "../Models/Services/UserService.js";
import createError from "../ultis/createError.js";
export const createOrder = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'))
        const quantity = req.body.quantity;
        const isPayment = req.body.isPayment
        const order = await createOrderService(req.params.idBook, req.id, quantity, isPayment);
        if(order instanceof Error) return next(order)
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

export const getOrdersByCustomer = async (req, res, next) =>{
    try {
        const orders = await getOrdersByCustomerService(req.id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders);
    } catch (error) {
        next(error)
    }
}
export const getOdrderByStore = async (req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return createError(400, 'Bạn không có quyền này!')
        const orders = await getOrderByStoreService(req.params.id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders)
    } catch (error) {
       next(error) 
    }
}
export const deleteOrder = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return createError(400, 'Bạn không có quyền này!')
        const delete_order = await deleteOrderService(req.params.id);
        if(delete_order instanceof Error) next(delete_order);
        res.status(200).send(delete_order)
    } catch (error) {
        next(error)
    }
}

export const satistical7StoreHigh = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!');
        const topStores = await satistical7StoreHighService(req.params.month);
        if(topStores instanceof Error) return next(topStores);
        res.status(200).send(topStores)
    } catch (error) {
        next(error)
    }
}
export const drawPrecentSatiscal = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!');
        const topStores = await drawPrecentSatiscalService(req.params.month);
        if(topStores instanceof Error) return next(topStores);
        res.status(200).send(topStores)
    } catch (error) {
        next(error)
    }
}

export const update_state_oder = async(req, res, next) => {
    try{
        const shipperId = req.id;

        if(!shipperId) return next(createError(400, 'Bạn không giao đơn hàng này!'))
        const order = await update_state_oderService(req.params.id);
        if(order instanceof Error) return next(order);
        res.status(200).send(order);
    } catch (error) {
        next(error)
    }
}

export const revenueStoreByMonth = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return createError(400, 'Bạn không có quyền này!');
        const doanhhthu = await revenueStoreByMonthService(req.params.id, req.body.month);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}
export const getNumOrderBy7Date = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const doanhhthu = await getNumOrderBy7DateService(req.params.id);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}
export const revenueByAdmin = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        let doanhhthu;
        if(req.body.month) doanhhthu = await revenueByAdminService(req.body.month)
        else doanhhthu = await revenuaAdminByDateSerVice(req.body.date)
        if(doanhhthu instanceof Error) return next(doanhhthu);
        return res.status(200).send(doanhhthu)

    } catch (error) {
        next(error)
    }
}


export const update_state_oder_2 = async(req, res, next) => {
    try{
        const shipperId = req.id;

        if(!shipperId) return next(createError(400, 'Bạn không giao đơn hàng này!'))
        const order = await update_state_oder2Service(req.params.id);
        if(order instanceof Error) return next(order);
        res.status(200).send(order);
    } catch (error) {
        next(error)
    }
}

