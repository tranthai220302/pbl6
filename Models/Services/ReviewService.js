import { Op, where } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
export const deleteReviewService = async(id,customer_id)=>{
    try {
        const delete_review = await db.review.destroy({
            where : {
                [Op.and] : [
                    {id},
                    {customer_id}
                ]
            }
        })
        if(delete_review == 0) return createError(400, 'Xoá đánh giá không thành công!')
        return {
            status: true,
            meessage: 'Xoá thành công!'
        };
    } catch (error) {
        return error;
    }
}
export const getReviewsByBookService = async(id) =>{
    try {
        const reviews = await db.review.findAll({
            where :{book_id: id}
        })
        if(reviews.length == 0) return {message : 'Không có đánh giá!'}
        return reviews;
    } catch (error) {
        return error;
    }
}
export const updateReviewService = async(id, desc, num_star, customer_id)=>{
    try {
        const update_review = await db.review.update({
            desc,
            num_star
        }, {
            where : {
                [Op.and] : [
                    {id},
                    {customer_id}
                ]
            }
        })
        if(update_review[0] == 0) return createError(400, 'Update không thành công!')
        return {
            status: true,
            message: 'Chỉnh sửa thành công!'
        }
    } catch (error) {
        
    }
}
export const createReviewService = async(desc, customer_id, book_id, num_star) =>{
    try {
        console.log(customer_id)
        console.log(book_id)
        const order = await db.order.findAll({
            where : {
                [Op.and] : [
                    {customer_id},
                    {BookId: book_id},
                    {isPayment : 1}
                ]
            }
        })
        if(order.length == 0) return createError(400, 'Bạn không thể đánh giá sản phẩm khi chưa có đơn hàng!')
        const checkUser = await db.review.findOne({
            where : {
                customer_id
            }
        })
        if(checkUser) return createError(400, 'Bạn đã đánh giá ản phẩm này!')
        const review = await db.review.create({
            desc,
            customer_id,
            book_id,
            num_star
        })
        if(!review) return createError(400, 'Đánh giá không thành công!')
        return review;
    } catch (error) {
        return error;
    }
}
