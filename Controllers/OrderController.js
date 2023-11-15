import { 
    createOrderService, 
    deleteOrderService, 
    drawPrecentSatiscalService, 
    getOrderByStoreService, 
    getOrdersByCustomerService, 
    satistical7StoreHighService
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
        const topStores = await drawPrecentSatiscalService();
        if(topStores instanceof Error) return next(topStores);
        res.status(200).send(topStores)
    } catch (error) {
        next(error)
    }
}
