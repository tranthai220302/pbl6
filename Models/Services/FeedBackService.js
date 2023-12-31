import { Op, where } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
export const createFeedBackService = async(idReview, desc, id) =>{
    try {
        const checkFeedBack = await db.feedBack.findOne({
            where : {
                ReviewId : idReview
            }
        })
        console.log(id)
        if(checkFeedBack) return createError(400, 'Bạn đã phản hồi đánh giá này rồi!');
        const checkReview = await db.review.findOne({
            where : {
                id : idReview
            },
            include : [
                {
                    model : db.book,
                    as : 'review2',
                    where : {
                        store_id  : id
                    }
                }
            ]
        })
        console.log(checkReview)
        if(!checkReview) return createError(400, 'Bạn không thể phản hồi!')
        const createFeedBack = await db.feedBack.create({
            ReviewId : idReview,
            desc
        });
        if(!createFeedBack) return createError(400, 'Phản hồi không thành công!');
        return {
            message : 'Phản hồi thành công!',
            feedBack : createFeedBack
        }
    } catch (error) {
        return error;
    }
}
export const deleteFeedBackService = async(id) =>{
    try {
        const deleteFeedBack = await db.feedBack.destroy({
            where : {id}
        });
        if(deleteFeedBack == 0) return createError(400,'Xoá phản hồi không thành công!');
        return {
            message : 'Xoá phản hồi thành công!'
        }
    } catch (error) {
        return error;
    }
}
export const updateFeedBackService = async(id, desc) =>{
    try {
        const updateFeedBack = await db.feedBack.update({
            desc
        },{
            where : {id}
        })
        if(updateFeedBack[0] === 0) return createError(400, 'Chỉnh sửa không thành công!');
        return {
            message : 'Chỉnh sửa thành công!'
        }
    } catch (error) {
        
    }
}