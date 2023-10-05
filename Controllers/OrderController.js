import { 
    createOrderService, 
    getOrdersByCustomerService 
} 
from "../Models/Services/OrderServices.js";

export const createOrder = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createOrder(400, 'Bạn không có quyền này!'))
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