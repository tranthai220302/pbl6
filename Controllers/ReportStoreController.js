import { getBookByStoreService } from "../Models/Services/BookService.js";
import { createReportService, deletReportService, getBookByReportService, getReportByStoreService, storeReportByCustomerService } from "../Models/Services/ReportStoreService.js";
import createError from "../ultis/createError.js";

export const createReport = async (req, res, next) =>{
    try {
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'));
        const filter = {
            ...(req.body.desc && {desc : req.body.desc}),
            ...(req.params.id && { book_id: req.params.id}),
            customer_id : req.id
        }
        const report = await createReportService(filter);
        if(report instanceof Error) return next(report);
        res.status(200).send(report)
    } catch (error) {
        return error;
    }
}
export const getReportByStore = async(req, res, next) =>{
    try {
        if(req.idRole !== 4 && req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const reports = await getReportByStoreService(req.params.id)
        if(reports instanceof Error) return next(reports);
        res.status(200).send(reports)
    } catch (error) {
        return   
    }
}
export const storeReportByCustomer = async(req, res, next) =>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const stores = await storeReportByCustomerService()
        if(stores instanceof Error) return next(stores);
        res.status(200).send(stores)
    } catch (error) {
        return error;
    }
}
export const getBookByReport = async(req, res, next) =>{
    try {
        if(req.idRole !== 2 && req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const stores = await getBookByReportService(req.params.id)
        if(stores instanceof Error) return next(stores);
        res.status(200).send(stores)
    } catch (error) {
        return error;
    }
}
export const deleteReport = async(req, res, next)=>{
    try {
        if(req.idRole !== 4) return next(createError(400, 'Bạn không có quyền này!'));
        const delete1 = await deletReportService(req.params.id);
        if(delete1 instanceof Error) next(delete1);
        res.status(200).send(delete1)
    } catch (error) {
        
    }
}