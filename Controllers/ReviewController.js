import { createReviewService, deleteReviewService, getReviewsByBookService, updateReviewService } from "../Models/Services/ReviewService.js";
import createError from "../ultis/createError.js";

export const deleteReview = async(req, res, next) =>{
    try {
        const id = req.params.id;
        const delete_review = await deleteReviewService(id, req.id);
        if(delete_review instanceof Error) return next(delete_review);
        res.status(200).send(delete_review);
    } catch (error) {
        next(error);
    }
} 
export const getReviewsByBook = async (req, res, next) =>{
    try {
        const idBook = req.params.id;
        const reviews = await getReviewsByBookService(idBook);
        if(reviews instanceof Error) return next(reviews);
        res.status(200).send(reviews);
    } catch (error) {
        next(error)
    }
}
export const createReview= async (req, res, next) =>{
    try {
        const idBook = req.params.id;
        if(req.idRole !== 1) return next(createError(400, 'Bạn không có quyền này!'))
        const data = req.body;
        const review = await createReviewService(data.desc, req.id, idBook, data.num_star);
        if(review instanceof Error) return next(review);
        res.status(200).send(review);
    } catch (error) {
        next(error);
    }
} 
export const updateReview = async (req, res, next) =>{
    try {
        const idReview = req.params.id;
        const data = req.body;
        const review = await updateReviewService(idReview, data.desc, data.num_star, req.id);
        if(review instanceof Error) return next(review)
        res.status(200).send(review);
    } catch (error) {
        next(error)
    }
}