import { Op } from "sequelize";
import createError from "../../ultis/createError.js";
import db from "../Entitys/index.js";
export const createReviewShipperService = async(desc, customer_id, order_id, num_star, img) =>{
    try {
        const shippemt = await db.shippemt.findOne({
            where : {
                OrderId: order_id,
                StateId: 4
            }
        })

        if(!shippemt) return createError(400, 'Đơn hàng chưa được giao!')
        const shipper_id = shippemt.shipperId;
        const checkUser = await db.reviewShipper.findOne({
            where : {
                [Op.and] : [
                    {customer_id},
                    {shipperId : shipper_id}
                ]
            }
        })
        if(checkUser) return createError(400, 'Bạn đã đánh giá shipper này!')
        const review = await db.reviewShipper.create({
            desc,
            customer_id,
            shipper_id,
            num_star,
            img
        })
        if(!review) return createError(400, 'Đánh giá không thành công!')
        return review;
    } catch (error) {
        return error;
    }
}

export const updateReviewShipperService = async(id, desc, num_star, customer_id)=>{
    try {
        const update_review = await db.reviewShipper.update({
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

export const deleteReviewShipperService = async(id,customer_id)=>{
    try {
        const delete_review = await db.reviewShipper.destroy({
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

export const getReportByShipperService = async(shipper_id) =>{
    try {
        const reports = await db.reportShipper.findAll({
            where : {shipper_id},
            include : [
                {
                    model : db.user,
                    as : 'customerReportShipper'
                }
            ]
        })
        if(reports.length == 0) return createError(400, 'Không có báo cáo!');
        return reports;
    } catch (error) {
        return error;   
    }
}
export const shipperReportByCustomerService = async() =>{
    try {
        const shipper = await db.reportShipper.findAll({
            attributes: ['shipper_id'],
            include: [
              {
                model: db.user,
                as: 'shipperByReport',
                attributes: { exclude: ['password'] }
              },
            ],
          })
          const uniqueShipperIds = new Set();
          const uniqueArray = shipper.filter(item => {
            const isUnique = !uniqueShipperIds.has(item.shipper_id);
            if (isUnique) {
              uniqueShipperIds.add(item.shipper_id);
            }
            return isUnique;
          });
          return uniqueArray;
    } catch (error) {
        return error;
    }
}