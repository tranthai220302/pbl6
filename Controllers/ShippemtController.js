import {
    createShippemtService,
    getShippemtbyShipperService
}
from "../Models/Services/ShippemtService.js";

export const createshippemt = async (req, res, next) =>{
    try {
        if(req.idRole !== 2) return next(createshippemt(400, 'Bạn không có quyền này!'))
        const shippemt = await createShippemtService(req.params.idOrder, req.idRole);
        if(shippemt instanceof Error) return next(shippemt)
        res.status(200).send(shippemt);
    } catch (error) {
        next(error);
    }
}

