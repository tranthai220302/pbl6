import { createReportShipperService, getReportByShipperService, shipperReportByCustomerService } from "../Models/Services/ReportShipperService.js";
import createError from "../ultis/createError.js";

export const createReport = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'));
        const filter = {
            ...(req.body.desc && {desc : req.body.desc}),
            ...(req.params.id && {shipper_id : req.params.id}),
            customer_id : req.id
        }
        const report = await createReportShipperService(filter);
        if(report instanceof Error) return next(report);
        res.status(200).send(report)
    } catch (error) {
        return error;
    }
}
export const getReportByShipper = async(req, res, next) =>{
    try {
        if(req.idRole !== 4 && req.idRole !== 3) return next(createError(400, 'Bạn không có quyền này!'));
        const reports = await getReportByShipperService(req.params.id)
        if(reports instanceof Error) return next(reports);
        res.status(200).send(reports)
    } catch (error) {
        return   
    }
}
export const shipperReportByCustomer = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const shippers = await shipperReportByCustomerService()
        if(shippers instanceof Error) return next(shippers);
        res.status(200).send(shippers)
    } catch (error) {
        return error;
    }
}