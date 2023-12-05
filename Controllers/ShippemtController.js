import {
    update_state_by_storeService,
    createShippemtService,
    update_state_end_by_custommerService,
    update_state_by_ShippemtService
}
from "../Models/Services/ShippemtService.js";
import createError from "../ultis/createError.js";

export const update_state_by_store = async (req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'))
        const state = await update_state_by_storeService(req.params.idOrder, req.id);
        if(state instanceof Error) return next(state)
        res.status(200).send(state);
    } catch (error) {
        next(error);
    }
}

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

export const update_state_end_by_custommer = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'))
        const state = await update_state_end_by_custommerService(req.params.idOrder, req.id);
        if(state instanceof Error) return next(state)
        res.status(200).send(state);
    } catch (error) {
        next(error);
    }
}

export const update_state_by_Shippemt = async (req, res, next) => {
    try {
        if(req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'))
        const idOrder = req.params.idOrder
        const shippemt = await update_state_by_ShippemtService(idOrder,req.id);
        if(shippemt instanceof Error) return next(shippemt)
        res.status(200).send(shippemt);
    } catch (error) {
        next(error);
    }
}
