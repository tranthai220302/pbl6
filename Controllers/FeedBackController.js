import createError from "../ultis/createError.js";
import { createFeedBackService, deleteFeedBackService, updateFeedBackService } from "../Models/Services/FeedBackService.js";
export const createFeedBack = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return createError(400, 'Bạn không có quyền này!');
        const feedBack = await createFeedBackService(req.params.id, req.body.desc, req.id);
        if(feedBack instanceof Error) return next(feedBack);
        res.status(200).send(feedBack)
    } catch (error) {
        next(error);
    }
}
export const deleteFeedBack = async(req, res, next)=>{
    try {
        if(req.idRole !== 2) return createError(400, 'Bạn không có quyền này!');
        const feedBack = await deleteFeedBackService(req.params.id);
        if(feedBack instanceof Error) return next(feedBack);
        res.status(200).send(feedBack)
    } catch (error) {
        next(error);
    }
}
export const updateFeedBack = async(req, res, next) =>{
    try {
        if(req.idRole !== 2) return createError(400, 'Bạn không có quyền này!');
        const feedBack = await updateFeedBackService(req.params.id, req.body.desc);
        if(feedBack instanceof Error) return next(feedBack); 
        res.status(200).send(feedBack)
    } catch (error) {
        next(error)
    }
}