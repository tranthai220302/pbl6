import { StarReviewShipperService, createReviewShipperService, deleteReviewShipperService, updateReviewShipperService } from "../Models/Services/ReviewShipperService.js";
import createError from "../ultis/createError.js";

export const createReviewShipper= async (req, res, next) =>{
    try {
        const order_id = req.params.id;
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'))
        const data = req.body;
        const review = await createReviewShipperService(data.desc, req.id, order_id, data.num_star, data.img);
        if(review instanceof Error) return next(review);
        res.status(200).send(review);
    } catch (error) {
        next(error);
    }
} 
export const updateReviewShipper = async (req, res, next) =>{
    try {
        const idReview = req.params.id;
        const data = req.body;
        const review = await updateReviewShipperService(idReview, data.desc, data.num_star, req.id);
        if(review instanceof Error) return next(review)
        res.status(200).send(review);
    } catch (error) {
        next(error)
    }
}

export const deleteReviewShipper = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const delete_review = await deleteReviewShipperService(id, req.id);
        if(delete_review instanceof Error) return next(delete_review);
        res.status(200).send(delete_review);
    } catch (error) {
        next(error);
    }
} 

export const StarReviewShipper = async(req, res, next) =>{
    try {
        const shipper_id = req.params.id;
        const reviews = await StarReviewShipperService(shipper_id);
        if(reviews instanceof Error) return next(reviews);
        res.status(200).send(reviews);
    } catch (error) {
        next(error)
    }
}