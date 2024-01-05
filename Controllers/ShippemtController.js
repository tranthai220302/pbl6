import {
    createShippemtService,
    update_state_successfulService,
    update_state_failedService,
    getOrdersByShipperService,
    getOrdersDeliveringService,
    getOrdersService,
    getOrderCompleteService,
    totalPriceShipperService,
    revenueShipperByMonthService,
    PriceShipperService,
    updateShipperService,
    OrderSuccessfullShipperByMonthService,
    OrderFailedShipperByMonthService,
    OrderShipperByMonthService
}
from "../Models/Services/ShippemtService.js";
import createError from "../ultis/createError.js";

export const createshippemt = async (req, res, next) =>{
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const idOrder = req.params.idOrder
        const shippemt = await createShippemtService(idOrder,req.id);
        if(shippemt instanceof Error) return next(shippemt)
        res.status(200).send(shippemt);
    } catch (error) {
        next(error);
    }
}

export const update_state_successful = async(req, res, next) => {
    try{
        const shipperId = req.id;

        if(!shipperId) return next(createError(400, 'Bạn không giao đơn hàng này!'))
        const order = await update_state_successfulService(req.params.id);
        if(order instanceof Error) return next(order);
        res.status(200).send(order);
    } catch (error) {
        next(error)
    }
}

export const update_state_failed = async(req, res, next) => {
    try{
        const shipperId = req.id;

        if(!shipperId) return next(createError(400, 'Bạn không giao đơn hàng này!'))
        const order = await update_state_failedService(req.params.id);
        if(order instanceof Error) return next(order);
        res.status(200).send(order);
    } catch (error) {
        next(error)
    }
}

export const getOrders = async(req, res, next) =>{
    try {
        if(req.idRole != 3) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const orders = await getOrdersService();
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
}



export const getOrdersByShipper = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const orders = await getOrdersByShipperService(shipper_id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
}

export const getOrdersDelivering = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const orders = await getOrdersDeliveringService(shipper_id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
}


export const getOrdersComplete = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const orders = await getOrderCompleteService(shipper_id);
        if(orders instanceof Error) return next(orders);
        res.status(200).send(orders);
    } catch (error) {
        next(error);
    }
}


export const revenueShipperByMonth = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const doanhhthu = await revenueShipperByMonthService(shipper_id, req.params.month);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}


export const updateShipper = async(req, res, next) =>{
    try {
        const data1 = req.body;
        const data2 = req.body;
        const id = req.id;
        if(!id)return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const shipper = await updateShipperService(data1, data2, id);
        if(shipper instanceof Error) return next(shipper)
        return res.status(200).send(shipper)
    } catch (error) {
        next(error)
    }
}

export const OrderSuccessFullShipperByMonth = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const doanhhthu = await OrderSuccessfullShipperByMonthService(shipper_id, req.params.month);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}

export const OrderFailedShipperByMonth = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const doanhhthu = await OrderFailedShipperByMonthService(shipper_id, req.params.month);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}

export const OrderShipperByMonth = async(req, res, next) =>{
    try {
        const shipper_id = req.id;
        if(!shipper_id) return next(createError(400, 'Bạn cần phải đăng nhập!'))
        const doanhhthu = await OrderShipperByMonthService(shipper_id, req.params.month);
        if(doanhhthu instanceof Error) return next(doanhhthu);
        res.status(200).send(doanhhthu)
    } catch (error) {
        next(error)
    }
}


